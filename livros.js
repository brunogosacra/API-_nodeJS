// DESAFIO (seção 14): API de livros
// Para rodar: pare o server.js (Ctrl+C) e execute  node livros.js
const express = require('express');
const app = express();
const PORTA = 3000;

app.use(express.json());

let proximoId = 3;
let livros = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
  { id: 2, titulo: 'Vidas Secas', autor: 'Graciliano Ramos' }
];

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de livros no ar' });
});

// Listar todos
app.get('/livros', (req, res) => {
  res.json(livros);
});

// Buscar por termo (título ou autor) - /buscar?termo=...
app.get('/buscar', (req, res) => {
  const termo = String(req.query.termo || '').toLowerCase();
  const resultado = livros.filter(l =>
    l.titulo.toLowerCase().includes(termo) ||
    l.autor.toLowerCase().includes(termo)
  );
  res.json(resultado);
});

// Consultar um
app.get('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const livro = livros.find(item => item.id === id);

  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }

  res.json(livro);
});

// Criar (valida titulo e autor)
app.post('/livros', (req, res) => {
  const { titulo, autor } = req.body;

  if (typeof titulo !== 'string' || !titulo.trim() ||
      typeof autor !== 'string' || !autor.trim()) {
    return res.status(400).json({ erro: 'Informe título e autor válidos' });
  }

  const novoLivro = {
    id: proximoId++,
    titulo: titulo.trim(),
    autor: autor.trim()
  };

  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

// Atualizar título e/ou autor
app.put('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const livro = livros.find(item => item.id === id);

  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }

  const { titulo, autor } = req.body;

  if (typeof titulo === 'string' && titulo.trim()) livro.titulo = titulo.trim();
  if (typeof autor === 'string' && autor.trim()) livro.autor = autor.trim();

  res.json(livro);
});

// Remover
app.delete('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const quantidadeAntes = livros.length;

  livros = livros.filter(item => item.id !== id);

  if (livros.length === quantidadeAntes) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }

  res.status(204).end();
});

app.listen(PORTA, () => {
  console.log(`API de livros ativa em http://localhost:${PORTA}`);
});
