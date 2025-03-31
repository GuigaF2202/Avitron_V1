// Arquivo: backend/monitoring.js

import http from 'http';
import fs from 'fs';
import os from 'os';

// Coletar métricas a cada 5 minutos
setInterval(() => {
  const memoryUsage = process.memoryUsage();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const cpuUsage = os.loadavg()[0]; // média de carga de 1 minuto
  
  const metrics = {
    timestamp: new Date().toISOString(),
    memory: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      systemTotal: Math.round(totalMemory / 1024 / 1024),
      systemFree: Math.round(freeMemory / 1024 / 1024)
    },
    cpu: cpuUsage,
    uptime: process.uptime()
  };
  
  // Criar diretório de logs se não existir
  fs.mkdir('logs', { recursive: true }, (err) => {
    if (err && err.code !== 'EEXIST') {
      console.error('Erro ao criar diretório de logs:', err);
      return;
    }
    
    // Registrar métricas em arquivo de log
    fs.appendFile(
      'logs/metrics.log', 
      JSON.stringify(metrics) + '\n', 
      (err) => {
        if (err) console.error('Erro ao registrar métricas:', err);
      }
    );
  });
}, 300000); // 5 minutos

export default {}; // Exportação necessária para ES Modules