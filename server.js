const express = require('express');
const path = require('node:path');
const app = express();
const PORTA = 3000;

// Deve vir ANTES das rotas que usam req.body
app.use(express.json());

// Serve o front-end (index.html, style.css, script.js) da pasta public
app.use(express.static(path.join(__dirname, 'public')));

let proximoId = 3;
let tarefas = [
  { id: 1, titulo: 'Estudar Node.js', concluida: false },
  { id: 2, titulo: 'Criar uma rota', concluida: true }
];

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de tarefas no ar' });
});

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.get('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(item => item.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.json(tarefa);
});

app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;

  if (!titulo || !titulo.trim()) {
    return res.status(400).json({ erro: 'Informe um título válido' });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const tarefa = tarefas.find(item => item.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  const { titulo, concluida } = req.body;

  if (typeof titulo === 'string' && titulo.trim()) tarefa.titulo = titulo.trim();
  if (typeof concluida === 'boolean') tarefa.concluida = concluida;

  res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id);
  const quantidadeAntes = tarefas.length;

  tarefas = tarefas.filter(item => item.id !== id);

  if (tarefas.length === quantidadeAntes) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  res.status(204).end();
});

// Demonstração de query string (seção 11)
app.get('/buscar', (req, res) => {
  const termo = String(req.query.termo || '').toLowerCase();
  const resultado = tarefas.filter(t =>
    t.titulo.toLowerCase().includes(termo)
  );
  res.json(resultado);
});

app.listen(PORTA, () => {
  console.log(`API ativa em http://localhost:${PORTA}`);
});
