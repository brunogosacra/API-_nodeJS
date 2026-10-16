# Guia: como montar a aula no VS Code (passo a passo da apostila)

## 1. Instalar e verificar
1. Baixe o Node.js **LTS** em https://nodejs.org/pt-br/download e instale com as opções padrão
   (no Windows, deixe marcada a opção de adicionar ao PATH).
2. Feche e reabra o VS Code.
3. Menu **Terminal > Novo Terminal** e rode:
       node --version
       npm --version

## 2. Abrir a pasta no VS Code
1. Extraia a pasta `aula-node` (ou crie uma: `mkdir aula-node` e `cd aula-node`).
2. VS Code: **Arquivo > Abrir Pasta...** e escolha `aula-node`.
3. Abra o terminal (Ctrl+`). Ele já abre dentro da pasta.

## 3. Instalar as dependências (uma vez)
       npm install
(Se estiver criando do zero: `npm init -y`, depois `npm install express` e `npm install --save-dev nodemon`.)

## 4. Executar cada etapa da apostila
| Seção | Arquivo | Comando | Teste |
|---|---|---|---|
| 4 | app.js | `node app.js` | Mostra "Olá, Turma de Desenvolvimento!" |
| 5.1 | app.js | `npm run app` | Mesmo resultado via script (na apostila o script é "start": "node app.js") |
| 6 | server-nativo.js | `node server-nativo.js` | http://localhost:3000 |
| 7 | server-nativo-rotas.js | `node server-nativo-rotas.js` | /, /sobre, /rota-inexistente |
| 8 | server-express-basico.js | `node server-express-basico.js` | /, /sobre |
| 9 | server.js | `node server.js` ou `npm start` | testes.http / curl |
| 11 | server.js (rota /buscar) | já incluída | /buscar?termo=node |
| 12 | server.js | `npm run dev` | reinicia sozinho (nodemon) |
| 14 | livros.js | `node livros.js` ou `npm run livros` | testes.http (seção Livros) |

Para encerrar qualquer servidor: **Ctrl+C** no terminal.
Todos usam a porta 3000, então rode **um por vez**. Se der EADDRINUSE, pare o anterior ou troque para 3001.

## 5. Testar POST, PUT e DELETE
- Opção A (VS Code): instale a extensão **REST Client** e abra `testes.http`; clique em "Send Request".
- Opção B (curl): veja os comandos abaixo.

    curl http://localhost:3000/tarefas
    curl -X POST http://localhost:3000/tarefas -H "Content-Type: application/json" -d '{"titulo":"Revisar rotas"}'
    curl -X PUT http://localhost:3000/tarefas/1 -H "Content-Type: application/json" -d '{"concluida":true}'
    curl -X DELETE http://localhost:3000/tarefas/2

No PowerShell use `curl.exe` e aspas assim:
    curl.exe -X POST http://localhost:3000/tarefas -H "Content-Type: application/json" -d "{\"titulo\":\"Revisar rotas\"}"

## 6. Respostas das perguntas de checagem
1. **O que faz o listen?** Abre a porta e deixa o servidor aguardando requisições.
2. **Como o servidor sabe qual rota executar?** Compara método HTTP + caminho com as rotas declaradas; a primeira que casa responde. Se nenhuma casar: 404.
3. **req.params x req.query?** params vem do caminho (/tarefas/15, via :id) e identifica um item; query vem após o "?" (?termo=node) e filtra/busca.
4. **Por que express.json() antes das rotas?** Middlewares e rotas rodam na ordem declarada; ele preenche req.body. Depois das rotas, req.body fica undefined.
5. **200, 201 e 404?** 200 = sucesso; 201 = recurso criado; 404 = recurso/rota não encontrado.

## 7. Registro de testes do desafio (modelo para entregar)
| Método | URL | Corpo | Resultado esperado |
|---|---|---|---|
| GET | /livros | - | 200 + lista |
| GET | /livros/1 | - | 200 + livro |
| GET | /livros/99 | - | 404 {"erro":"Livro não encontrado"} |
| POST | /livros | {"titulo":"O Cortiço","autor":"Aluísio Azevedo"} | 201 + livro com id 3 |
| POST | /livros | {"titulo":"Sem autor"} | 400 |
| PUT | /livros/1 | {"autor":"Novo autor"} | 200 + livro atualizado |
| PUT | /livros/99 | {"autor":"X"} | 404 |
| DELETE | /livros/2 | - | 204 (sem corpo) |
| DELETE | /livros/99 | - | 404 |
| GET | /buscar?termo=machado | - | 200 + livros que casam |
