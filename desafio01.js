const express = require('express');
const server = express();
server.use(express.json());

const projects = [
  {
  "id": "0",
  "title": "Sega",
  "tasks": []
  },
  {
  "id": "1",
  "title": "Playstation",
  "tasks": []
  }
]

//---Middlewares
function checkIdExists (req, res, next) {
  const identity = projects[req.params.id]
  if(!identity) {
    return res.status(400).json({error: 'ID non-existent'});
  }
  return next();
}

function countReq (req, res, next) {
  console.count("Request Counter");
  return next();
}

server.use(countReq);

server.post('/projects',(req, res) => {
  const id = req.body.id
  const title = req.body.title;
  const tasks = []
  projects.push({"id":id, "title": title});
  //projects.push(title);
  //projects.push(tasks);
  return res.json(projects)
})

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.put('/projects/:id', checkIdExists, (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  projects[id].title=title;
  return res.json(projects);
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const id = req.params.id;
  projects.splice(id, 1);
  return res.json(projects);
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
const id = req.params.id;
const title = req.body.title;
if(projects[id].tasks == null) {
projects[id].tasks = [title];}
else {
  projects[id].tasks.push(title)
}

return res.json(projects);

})

server.listen(3030);