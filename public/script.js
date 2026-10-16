const API = '/tarefas';

const lista = document.getElementById('lista');
const form = document.getElementById('form-tarefa');
const campo = document.getElementById('titulo');
const erro = document.getElementById('erro');
const vazio = document.getElementById('vazio');
const contador = document.getElementById('contador');
const botoesFiltro = document.querySelectorAll('.filtro');

let tarefas = [];
let filtroAtual = 'todas';

function mostrarErro(mensagem) {
  erro.textContent = mensagem;
  erro.hidden = !mensagem;
}

async function carregar() {
  try {
    const resposta = await fetch(API);
    tarefas = await resposta.json();
    mostrarErro('');
    renderizar();
  } catch {
    mostrarErro('Não foi possível conectar à API. O servidor está rodando?');
  }
}

function renderizar() {
  const visiveis = tarefas.filter(t =>
    filtroAtual === 'todas' ||
    (filtroAtual === 'concluidas' ? t.concluida : !t.concluida)
  );

  lista.innerHTML = '';

  for (const tarefa of visiveis) {
    const li = document.createElement('li');
    li.className = 'item' + (tarefa.concluida ? ' concluida' : '');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = tarefa.concluida;
    check.setAttribute('aria-label', 'Concluir tarefa');
    check.addEventListener('change', () => alternar(tarefa));

    const titulo = document.createElement('span');
    titulo.className = 'titulo';
    titulo.textContent = tarefa.titulo;

    const botao = document.createElement('button');
    botao.className = 'remover';
    botao.textContent = '✕';
    botao.setAttribute('aria-label', 'Remover tarefa');
    botao.addEventListener('click', () => remover(tarefa.id));

    li.append(check, titulo, botao);
    lista.append(li);
  }

  vazio.hidden = visiveis.length > 0;

  const pendentes = tarefas.filter(t => !t.concluida).length;
  contador.textContent = `${tarefas.length} tarefa(s), ${pendentes} pendente(s)`;
}

async function criar(titulo) {
  const resposta = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo })
  });

  if (!resposta.ok) {
    const dados = await resposta.json();
    throw new Error(dados.erro || 'Erro ao criar tarefa');
  }
}

async function alternar(tarefa) {
  await fetch(`${API}/${tarefa.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ concluida: !tarefa.concluida })
  });
  carregar();
}

async function remover(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  carregar();
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    await criar(campo.value);
    campo.value = '';
    campo.focus();
    await carregar();
  } catch (e) {
    mostrarErro(e.message);
  }
});

botoesFiltro.forEach(botao => {
  botao.addEventListener('click', () => {
    filtroAtual = botao.dataset.filtro;
    botoesFiltro.forEach(b => b.classList.toggle('ativo', b === botao));
    renderizar();
  });
});

carregar();
