Avitron Metaverse
Visão Geral
O Avitron Metaverse é uma plataforma digital imersiva que permite aos usuários explorar mundos virtuais, criar avatares personalizados e interagir em um ambiente tridimensional compartilhado. A plataforma combina elementos de redes sociais, jogos online e realidades virtuais para oferecer uma experiência digital única.
Características Principais

Criação de Avatares: Personalize seu representante digital com diversas opções de aparência
Exploração de Mundos: Visite regiões variadas criadas tanto pela equipe Avitron quanto pela comunidade
Marketplace: Compre, venda e troque itens digitais, terrenos e outros recursos
Eventos Sociais: Participe de eventos virtuais, desde concertos até palestras educacionais
Economia Virtual: Sistema econômico completo com moeda própria e transações seguras

Tecnologias Utilizadas
O projeto utiliza um conjunto moderno de tecnologias:

Frontend: React.js, Vite, Tailwind CSS
Backend: Node.js, Express
Banco de Dados: PostgreSQL
Internacionalização: i18next com suporte para inglês, espanhol e português
Autenticação: Sistema próprio com JWT e verificação por email
Comunicação: RESTful API

Estrutura do Projeto
O projeto está organizado em duas partes principais:
Copiaravitron-metaverse/
│
├── backend/           # Servidor API e lógica de negócios
│   ├── server.js      # Ponto de entrada do servidor
│   ├── server/        # Controladores, rotas e middleware
│   └── database/      # Esquemas e migrações do banco de dados
│
└── frontend/          # Interface de usuário web
    ├── src/           # Código-fonte do React
    ├── public/        # Recursos estáticos
    └── locales/       # Arquivos de tradução

Requisitos do Sistema

Node.js 18.0 ou superior
PostgreSQL 14.0 ou superior
NPM 8.0 ou superior

Instalação

Clone o repositório:
bashCopiargit clone https://github.com/GuigaF2202/Avitron_V1
cd avitron-metaverse

Instale as dependências:
bashCopiarnpm run install:all

Configure o banco de dados:
bashCopiarnpm run setup-db

Configure as variáveis de ambiente:

Crie um arquivo .env na pasta backend com base no modelo .env.example
Ajuste as configurações de banco de dados e email conforme necessário



Execução
Ambiente de Desenvolvimento
Para iniciar o servidor de desenvolvimento:
bashCopiarnpm run dev
Isso iniciará tanto o servidor backend (na porta 8080) quanto o frontend (na porta 3000).
Para executar apenas o backend ou o frontend:
bashCopiarnpm run dev:backend
npm run dev:frontend
Ambiente de Produção
Para construir o frontend para produção:
bashCopiarnpm run build
Para iniciar o servidor em modo de produção:
bashCopiarnpm run start
Acesso à Plataforma
Após iniciar o servidor, você pode acessar a plataforma através do seu navegador:

Ambiente de desenvolvimento: http://localhost:3000
Ambiente de produção: https://exemple.com (ou seu domínio configurado)

Internacionalização
O Avitron Metaverse suporta múltiplos idiomas:

Inglês (padrão)
Espanhol
Português

Para extrair novas strings para tradução:
bashCopiarcd frontend
npm run extract-translations
Contribuição
Para contribuir com o projeto:

Crie um fork do repositório
Crie uma branch para sua feature (git checkout -b feature/nova-funcionalidade)
Implemente suas mudanças
Execute os testes e o linting (npm run lint)
Faça commit das suas alterações (git commit -m 'Adiciona nova funcionalidade')
Envie para o Github (git push origin feature/nova-funcionalidade)
Abra um Pull Request

Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.
Contato
Para mais informações, entre em contato com a equipe Avitron Metaverse:

Website: avitronmultiverse.com
Email: support@avitronmultiverse.com

Agradecimentos
Agradecemos a todos os colaboradores e à comunidade open source pelas ferramentas e bibliotecas que tornaram este projeto possível.