const express = require("express");

const server = express();

server.use(express.json());

server.listen(3131);

const projeto = [{ id: 1, title: "Novo projeto", tasks: [] }];

var reqsCount = 0;

//conta quantas requisições e exibe no terminal
server.use((req, res, next) => {
  reqsCount++;
  console.log(`${reqsCount} requisições até o momento`);
  return next();
});

//checa se o id existe
function idCheck(req, res, next) {
  const id = projeto[req.params.id];

  if (!id) {
    console.log("sem sucesso");
    return res
      .status(400)
      .json({ error: `O ID ${req.params.id} não  foi encontrado` });
  }
  console.log("deu bom");
  return next();
}

//home ou teste
server.get("/", (req, res) => {
  return res.send("Tudo ok!!");
});

//lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projeto);
});

//cadastra novo projeto
server.post("/projects", (req, res) => {
  projeto.push(req.body);
  return res.json(projeto);
});

//altera titulo conforme id

server.put("/projects/:id", idCheck, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projeto[id].title = title;

  return res.json(projeto);
});

//exclui projeto

server.delete("/projects/:id", idCheck, (req, res) => {
  const { id } = req.params;

  projeto.splice(id, 1);

  return res.json(projeto);
});

//add tarefas
server.post("/projects/:id/tasks", idCheck, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projeto[id].tasks.push(title);

  return res.json(projeto);
});

console.log("Server Iniciado!!");
