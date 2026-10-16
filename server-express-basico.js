const express = require('express');
const app = express();
const PORTA = 3000;

app.get('/', (req, res) => {
  res.send('Minha primeira aplicação Express');
});

app.get('/sobre', (req, res) => {
  res.send('Servidor criado com Node.js e Express');
});

app.listen(PORTA, () => {
  console.log(`Servidor ativo em http://localhost:${PORTA}`);
});
