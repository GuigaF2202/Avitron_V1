// Carregar variáveis de ambiente
require('dotenv').config();

import express from 'express';
import { Pool } from 'pkg';
import { hash, compare } from 'bcrypt';
import cors from 'cors';
import { json } from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { createTransport } from 'nodemailer';
import { randomBytes } from 'crypto';

const app = express();
const port = process.env.PORT || 8080;

// Configuração de proxy confiável (mais segura)
// Especifique os IPs do proxy que você confia, ou desative se não estiver usando proxy
app.set('trust proxy', false); // Desativa o trust proxy por padrão

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']    
}));
app.use(json());

// Configuração do transporte de e-mail para Zoho
let transporter;
try {
  transporter = createTransport({
    host: process.env.EMAIL_HOST || 'smtp.zoho.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_PORT === '465', // true para porta 465, false para outras portas
    auth: {
      user: process.env.EMAIL_USER, // seu endereço de e-mail Zoho completo
      pass: process.env.EMAIL_PASS  // senha da sua conta Zoho
    }
  });
  
  console.log('Configuração de e-mail Zoho carregada com sucesso');
} catch (error) {
  console.error('Erro ao configurar transporte de e-mail Zoho:', error);
}

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false // Use this ONLY for development
    }
});

// Verificação da conexão com o banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso às', res.rows[0].now);
  }
});

// Rota para testar a conexão com o banco de dados
app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as time');
    client.release();
    res.status(200).json({ 
      status: 'success', 
      message: 'Database connection is working',
      timestamp: result.rows[0].time
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Rota para registro de usuários
app.post('/api/register', async (req, res) => {
  const { username, password, email, securityQuestion, securityAnswer, termsConsent, avatar } = req.body;

  // Validação básica
  if (!username || !password || !email || !securityQuestion || !securityAnswer || !termsConsent || !avatar) {
    return res.status(400).json({ status: 'error', message: 'Campos obrigatórios não preenchidos' });
  }

  try {
    // Verificar se o usuário já existe
    const userCheck = await pool.query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
    
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ status: 'error', message: 'Nome de usuário ou email já existe' });
    }

    // Hash da senha
    const saltRounds = 10;
    const passwordHash = await hash(password, saltRounds);

    // Gerar token de verificação de email
    const verificationToken = randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Iniciar uma transação para garantir que ambas as inserções sejam bem-sucedidas
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Inserir dados na tabela users
      const userResult = await client.query(
        `INSERT INTO users (username, password_hash, email, avatar_type, security_question, security_answer, terms_consent, verified, verification_token, verification_expires)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
        [username, passwordHash, email, avatar, securityQuestion, securityAnswer, termsConsent, false, verificationToken, verificationExpires]
      );

      // Processar nome de usuário para firstname e lastname
      const nameParts = username.split(' ');
      const firstname = nameParts[0];
      const lastname = nameParts.length > 1 ? nameParts[1] : 'Resident';

      // Gerar UUIDs
      const principalId = uuidv4(); // Gerar um novo UUID para principalid
      const scopeId = uuidv4(); // Gerar um novo UUID para scopeid

      // Inserir dados na tabela useraccounts com todos os campos necessários
      await client.query(
        `INSERT INTO useraccounts (
          principalid, 
          scopeid, 
          firstname, 
          lastname, 
          email, 
          created, 
          userflags,
          usertitle
        ) VALUES ($1, $2, $3, $4, $5, EXTRACT(EPOCH FROM NOW())::integer, 0, '')`,
        [principalId, scopeId, firstname, lastname, email]
      );

      await client.query('COMMIT');
      
      // Preparar dados mockados para dashboard
      const mockUser = {
        id: userResult.rows[0].id,
        username: username,
        avatar: avatar,
        email: email,
        verified: false,
        level: 1,
        experience: 250,
        nextLevel: 1000,
        currency: 500,
        credits: 0,
        totalFriends: 0,
        onlineFriends: 0,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      // Enviar email de verificação
      if (transporter) {
        try {
          const verificationUrl = `https://avitronmultiverse.com/verificar-email/${verificationToken}`;
          const mailOptions = {
            from: process.env.EMAIL_FROM || `"Avitron Multiverse" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verificação de Email - Avitron Multiverse',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="color: #4F46E5;">Avitron Multiverse</h1>
                </div>
                <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                  <h2 style="margin-top: 0; color: #4F46E5;">Verificação de Email</h2>
                  <p>Olá ${firstname},</p>
                  <p>Obrigado por se registrar no Avitron Multiverse!</p>
                  <p>Por favor, confirme seu endereço de email clicando no botão abaixo:</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verificar meu email</a>
                  </div>
                  <p>Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:</p>
                  <p style="word-break: break-all; background-color: #eee; padding: 10px; border-radius: 4px; font-size: 14px;">${verificationUrl}</p>
                  <p>Este link expirará em 24 horas.</p>
                  <p style="margin-bottom: 0;">Se você não criou uma conta no Avitron Multiverse, por favor ignore este email.</p>
                </div>
                <div style="text-align: center; font-size: 12px; color: #666;">
                  <p>© ${new Date().getFullYear()} Avitron Multiverse. Todos os direitos reservados.</p>
                </div>
              </div>
            `
          };
          await transporter.sendMail(mailOptions);
          console.log(`Email de verificação enviado para: ${email}`);
        } catch (emailError) {
          console.error('Erro ao enviar email de verificação:', emailError);
        }
      } else {
        console.log(`URL de verificação: https://avitronmultiverse.com/verificar-email/${verificationToken}`);
      }
      
      res.status(201).json({
        status: 'success',
        message: 'Usuário registrado com sucesso. Por favor, verifique seu email para ativar sua conta.',
        user: mockUser
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao registrar usuário' });
  }
});

// Rota para login de usuários
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      status: 'error', 
      message: 'Nome de usuário e senha são obrigatórios' 
    });
  }

  try {
    // Buscar usuário pelo nome de usuário
    const userResult = await pool.query(
      'SELECT id, username, password_hash, avatar_type, email, verified FROM users WHERE username = $1', 
      [username]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Credenciais inválidas' 
      });
    }

    const user = userResult.rows[0];
    
    // Verificar senha
    const passwordMatch = await compare(password, user.password_hash);
    
    if (!passwordMatch) {
      return res.status(401).json({ 
        status: 'error', 
        message: 'Credenciais inválidas' 
      });
    }

    // Verificar se o email foi verificado
    if (!user.verified) {
      return res.status(403).json({
        status: 'error',
        message: 'Sua conta ainda não foi verificada. Por favor, verifique seu email ou solicite um novo link de verificação.'
      });
    }

    // Atualizar último login
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1', 
      [user.id]
    );

    // Preparar dados mockados para dashboard
    const mockUserData = {
      id: user.id,
      username: user.username,
      avatar: user.avatar_type,
      email: user.email,
      verified: user.verified,
      level: 5,
      experience: 750,
      nextLevel: 1000,
      currency: 1250,
      credits: 50,
      totalFriends: 12,
      onlineFriends: 3,
      lastLogin: new Date().toISOString(),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias atrás
    };

    res.status(200).json({
      status: 'success',
      message: 'Login realizado com sucesso',
      user: mockUserData
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Erro ao processar login',
      details: error.message
    });
  }
});

// Rota para verificar email
app.get('/api/verificar-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ status: 'error', message: 'Token não fornecido' });
  }

  try {
    // Verificar se o token existe e não expirou
    const result = await pool.query(
      'SELECT id FROM users WHERE verification_token = $1 AND verification_expires > NOW()',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Token inválido ou expirado' });
    }

    // Atualizar o status de verificação do usuário
    await pool.query(
      'UPDATE users SET verified = TRUE, verification_token = NULL, verification_expires = NULL WHERE id = $1',
      [result.rows[0].id]
    );

    res.status(200).json({ status: 'success', message: 'Email verificado com sucesso' });
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao verificar email' });
  }
});

// Rota para reenviar email de verificação
app.post('/api/reenviar-verificacao', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email obrigatório' });
  }

  try {
    // Verificar se o usuário existe e ainda não está verificado
    const userResult = await pool.query(
      'SELECT id, username, verified FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'Email não encontrado' });
    }

    const user = userResult.rows[0];

    if (user.verified) {
      return res.status(400).json({ status: 'error', message: 'Email já verificado' });
    }

    // Gerar novo token de verificação
    const newToken = randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Atualizar token na tabela users
    await pool.query(
      'UPDATE users SET verification_token = $1, verification_expires = $2 WHERE id = $3',
      [newToken, tokenExpires, user.id]
    );

    // Processar nome de usuário para firstname
    const nameParts = user.username.split(' ');
    const firstname = nameParts[0];

    // Enviar email de verificação
    if (transporter) {
      try {
        const verificationUrl = `https://avitronmultiverse.com/verificar-email/${newToken}`;
        const mailOptions = {
          from: process.env.EMAIL_FROM || `"Avitron Multiverse" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Verificação de Email - Avitron Multiverse',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #4F46E5;">Avitron Multiverse</h1>
              </div>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                <h2 style="margin-top: 0; color: #4F46E5;">Verificação de Email</h2>
                <p>Olá ${firstname},</p>
                <p>Você solicitou um novo link de verificação de email para sua conta no Avitron Multiverse.</p>
                <p>Por favor, confirme seu endereço de email clicando no botão abaixo:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verificar meu email</a>
                </div>
                <p>Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:</p>
                <p style="word-break: break-all; background-color: #eee; padding: 10px; border-radius: 4px; font-size: 14px;">${verificationUrl}</p>
                <p>Este link expirará em 24 horas.</p>
                <p style="margin-bottom: 0;">Se você não solicitou este email, por favor ignore-o.</p>
              </div>
              <div style="text-align: center; font-size: 12px; color: #666;">
                <p>© ${new Date().getFullYear()} Avitron Multiverse. Todos os direitos reservados.</p>
              </div>
            </div>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log(`Novo email de verificação enviado para: ${email}`);
      } catch (emailError) {
        console.error('Erro ao enviar novo email de verificação:', emailError);
        return res.status(500).json({ status: 'error', message: 'Erro ao enviar email de verificação' });
      }
    } else {
      console.log(`Nova URL de verificação: https://avitronmultiverse.com/verificar-email/${newToken}`);
    }

    res.status(200).json({ status: 'success', message: 'Email de verificação reenviado com sucesso' });
  } catch (error) {
    console.error('Erro ao reenviar verificação:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao processar solicitação' });
  }
});

// Rota para atualizar senha
app.post('/api/user/update-password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'Todos os campos são obrigatórios'
    });
  }

  try {
    // Buscar usuário pelo ID
    const userResult = await pool.query(
      'SELECT id, password_hash FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuário não encontrado'
      });
    }

    const user = userResult.rows[0];

    // Verificar senha atual
    const passwordMatch = await compare(currentPassword, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Senha atual incorreta'
      });
    }

    // Hash da nova senha
    const saltRounds = 10;
    const newPasswordHash = await hash(newPassword, saltRounds);

    // Atualizar senha no banco de dados
    await pool.query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [newPasswordHash, userId]
    );

    res.status(200).json({
      status: 'success',
      message: 'Senha atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao processar a solicitação',
      details: error.message
    });
  }
});

// Rota para atualizar e-mail
app.post('/api/user/update-email', async (req, res) => {
  const { userId, password, newEmail } = req.body;

  if (!userId || !password || !newEmail) {
    return res.status(400).json({
      status: 'error',
      message: 'Todos os campos são obrigatórios'
    });
  }

  try {
    // Verificar se o e-mail já está em uso
    const emailCheck = await pool.query(
      'SELECT id FROM users WHERE email = $1 AND id != $2',
      [newEmail, userId]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(409).json({
        status: 'error',
        message: 'Este e-mail já está em uso'
      });
    }

    // Buscar usuário pelo ID
    const userResult = await pool.query(
      'SELECT id, password_hash, username FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuário não encontrado'
      });
    }

    const user = userResult.rows[0];

    // Verificar senha
    const passwordMatch = await compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Senha incorreta'
      });
    }

    // Iniciar uma transação para atualizar o e-mail em ambas as tabelas
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Atualizar e-mail na tabela users
      await client.query(
        'UPDATE users SET email = $1 WHERE id = $2',
        [newEmail, userId]
      );

      // Atualizar e-mail na tabela useraccounts
      const fullname = user.username;
      const nameParts = fullname.split(' ');
      const firstname = nameParts[0];
      const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Resident';
      
      await client.query(
        'UPDATE useraccounts SET email = $1 WHERE firstname = $2 AND lastname = $3',
        [newEmail, firstname, lastname]
      );

      await client.query('COMMIT');
      
      res.status(200).json({
        status: 'success',
        message: 'E-mail atualizado com sucesso'
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro ao atualizar e-mail:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao processar a solicitação',
      details: error.message
    });
  }
});

// Rota para "Esqueceu a senha"
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 'error',
      message: 'E-mail é obrigatório'
    });
  }

  try {
    // Verificar se o e-mail existe
    const userResult = await pool.query(
      'SELECT id, username FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      // Por segurança, não informamos se o e-mail existe ou não
      return res.status(200).json({
        status: 'success',
        message: 'Se o e-mail existir, enviaremos as instruções para redefinição de senha.'
      });
    }

    // Gerar token de redefinição de senha
    const token = uuidv4();
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); // Token válido por 1 hora

    // Buscar registro na tabela useraccounts
    const nameParts = userResult.rows[0].username.split(' ');
    const firstname = nameParts[0];
    const lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Resident';

    const userAccountResult = await pool.query(
      'SELECT principalid FROM useraccounts WHERE firstname = $1 AND lastname = $2',
      [firstname, lastname]
    );

    if (userAccountResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Conta de usuário não encontrada'
      });
    }

    // Verificar se as colunas reset_token e reset_token_expires existem
    const columnsExist = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'useraccounts' 
      AND column_name IN ('reset_token', 'reset_token_expires');
    `);

    // Se as colunas não existirem, criá-las
    if (columnsExist.rows.length < 2) {
      await pool.query(`
        ALTER TABLE useraccounts 
        ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255),
        ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP;
      `);
    }

    // Atualizar o token na tabela useraccounts
    await pool.query(
      'UPDATE useraccounts SET reset_token = $1, reset_token_expires = $2 WHERE principalid = $3',
      [token, expiration, userAccountResult.rows[0].principalid]
    );

    // Enviar e-mail com o link de redefinição
    if (transporter) {
      try {
        // Preparar o e-mail
        const resetUrl = `https://avitronmultiverse.com/reset-password?token=${token}`;
        const mailOptions = {
          from: process.env.EMAIL_FROM || `"Avitron Multiverse" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Redefinição de Senha - Avitron Multiverse',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #4F46E5;">Avitron Multiverse</h1>
              </div>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                <h2 style="margin-top: 0; color: #4F46E5;">Redefinição de senha solicitada</h2>
                <p>Olá ${firstname},</p>
                <p>Você solicitou a redefinição da sua senha de acesso ao Avitron Multiverse.</p>
                <p>Clique no botão abaixo para criar uma nova senha. Este link é válido por 1 hora.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Redefinir minha senha</a>
                </div>
                <p>Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:</p>
                <p style="word-break: break-all; background-color: #eee; padding: 10px; border-radius: 4px; font-size: 14px;">${resetUrl}</p>
                <p style="margin-bottom: 0;">Se você não solicitou esta redefinição, por favor ignore este e-mail ou entre em contato com nosso suporte se tiver dúvidas.</p>
              </div>
              <div style="text-align: center; font-size: 12px; color: #666;">
                <p>© ${new Date().getFullYear()} Avitron Multiverse. Todos os direitos reservados.</p>
              </div>
            </div>
          `
        };
        // Enviar o e-mail
        await transporter.sendMail(mailOptions);
        console.log(`E-mail de redefinição enviado para: ${email}`);
      } catch (emailError) {
        console.error('Erro ao enviar e-mail de redefinição:', emailError);
        // Não retornamos erro para o cliente para não revelar se o e-mail existe
      }
    } else {
      // Fallback para depuração se o transporter não estiver configurado
      console.log(`URL de redefinição: https://avitronmultiverse.com/reset-password?token=${token}`);
    }
 
    // Resposta de sucesso (apenas uma vez, no final da função)
    return res.status(200).json({
      status: 'success',
      message: 'Se o e-mail existir, enviaremos as instruções para redefinição de senha.'
    });
 
  } catch (error) {
    console.error('Erro ao processar solicitação de redefinição de senha:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao processar a solicitação',
      details: error.message
    });
  }
 });
 
 // Rota para verificar o token de redefinição de senha
 app.get('/api/verify-reset-token', async (req, res) => {
  const { token } = req.query;
 
  if (!token) {
    return res.status(400).json({
      status: 'error',
      message: 'Token é obrigatório'
    });
  }
 
  try {
    // Verificar se o token existe e não expirou
    const result = await pool.query(
      'SELECT principalid FROM useraccounts WHERE reset_token = $1 AND reset_token_expires > NOW()',
      [token]
    );
 
    if (result.rows.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Token inválido ou expirado'
      });
    }
 
    res.status(200).json({
      status: 'success',
      message: 'Token válido',
      principalId: result.rows[0].principalid
    });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao processar a solicitação',
      details: error.message
    });
  }
 });
 
 // Rota para redefinir a senha com o token
 app.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
 
  if (!token || !newPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'Token e nova senha são obrigatórios'
    });
  }
 
  try {
    // Verificar se o token existe e não expirou
    const tokenResult = await pool.query(
      'SELECT principalid FROM useraccounts WHERE reset_token = $1 AND reset_token_expires > NOW()',
      [token]
    );
 
    if (tokenResult.rows.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Token inválido ou expirado'
      });
    }
 
    const principalId = tokenResult.rows[0].principalid;
 
    // Buscar o usuário pelo principalId
    const userAccountResult = await pool.query(
      'SELECT firstname, lastname FROM useraccounts WHERE principalid = $1',
      [principalId]
    );
 
    if (userAccountResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuário não encontrado'
      });
    }
 
    const { firstname, lastname } = userAccountResult.rows[0];
    const fullName = lastname === 'Resident' ? firstname : `${firstname} ${lastname}`;
 
    // Buscar o ID do usuário na tabela users pelo nome
    const userResult = await pool.query(
      'SELECT id FROM users WHERE username = $1',
      [fullName]
    );
 
    if (userResult.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuário não encontrado na tabela users'
      });
    }
 
    const userId = userResult.rows[0].id;
 
    // Hash da nova senha
    const saltRounds = 10;
    const newPasswordHash = await hash(newPassword, saltRounds);
 
    // Atualizar a senha e limpar o token
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
 
      // Atualizar senha na tabela users
      await client.query(
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        [newPasswordHash, userId]
      );
 
      // Limpar o token de redefinição
      await client.query(
        'UPDATE useraccounts SET reset_token = NULL, reset_token_expires = NULL WHERE principalid = $1',
        [principalId]
      );
 
      await client.query('COMMIT');
 
      res.status(200).json({
        status: 'success',
        message: 'Senha redefinida com sucesso'
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro ao processar a solicitação',
      details: error.message
    });
  }
 });
 
 // Configurações de segurança adicionais para produção
 if (process.env.NODE_ENV === 'production') {
  // Configurar helmet para segurança adicional
  const helmet = require('helmet');
  app.use(helmet());
  
  // Limitar taxa de requisições com configuração segura
  const rateLimit = require('express-rate-limit');
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // limite de 100 requisições por janela
    standardHeaders: true, // Retorna informações de limite de taxa nos cabeçalhos `RateLimit-*`
    legacyHeaders: false, // Desativa os cabeçalhos `X-RateLimit-*`
    // Configuração explícita de IP
    keyGenerator: (req) => {
      // Use diretamente o IP remoto, sem confiar em cabeçalhos de encaminhamento
      return req.ip || req.connection.remoteAddress;
    },
    // Ou, se você estiver atrás de um proxy confiável (como Nginx)
    // comente a configuração de keyGenerator acima e descomente:
    // trustProxy: process.env.NODE_ENV === 'production', // Usar apenas em produção
    // Em seguida, em app.set('trust proxy'), defina os IPs do proxy
  });
  app.use('/api/', limiter);
  
  console.log('Servidor rodando em modo de produção com proteções adicionais.');
 }
 
 // Iniciar o servidor
 app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
  console.log(`Teste a API em https://avitronmultiverse.com:${port}/api/health`);
 });