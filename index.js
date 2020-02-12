const express = require("express");

const server = express();

server.use(express.json());

server.listen(3131);

const projeto = [{ id: "1", title: "Novo projeto", tasks: [] }];

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

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projeto[id].title = title;

  return res.json(projeto);
});

//exclui projeto

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  projeto.splice(id, 1);
  return res.json(projeto);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projeto[id].tasks.push(title);

  return res.json(projeto);
});

console.log("Server Iniciado!!");
