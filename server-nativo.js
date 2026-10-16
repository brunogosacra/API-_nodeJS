const http = require('node:http');

const PORTA = 3000;

const servidor = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Servidor Node.js funcionando!');
});

servidor.listen(PORTA, () => {
  console.log(`Servidor disponível em http://localhost:${PORTA}`);
});
