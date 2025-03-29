const http = require('http');
const fs = require('fs');
const os = require('os');

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
  
  // Registrar métricas em arquivo de log
  fs.appendFile(
    'logs/metrics.log', 
    JSON.stringify(metrics) + '\n', 
    (err) => {
      if (err) console.error('Erro ao registrar métricas:', err);
    }
  );
  
}, 300000); // 5 minutos

// Adicionar ao server.js:
// require('./monitoring'); 