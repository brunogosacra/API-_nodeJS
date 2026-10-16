const http = require('node:http');

const servidor = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    return res.end('Página inicial');
  }

  if (req.method === 'GET' && req.url === '/sobre') {
    res.statusCode = 200;
    return res.end('API de demonstração da turma');
  }

  res.statusCode = 404;
  res.end('Rota não encontrada');
});

servidor.listen(3000, () => {
  console.log('Acesse http://localhost:3000');
});
