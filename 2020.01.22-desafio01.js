const express = require('express');

const server = express();
server.use(express.json())

/*
server.get('/teste',() => {
console.log('teste');
})
*/

const projects = []
var counter = 0;

// Middleware 1
function checkIdExists (req, res, next) {
  const {id} = req.params
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'ID does not exist' });
  }

  return next();
}

// Middleware 2
function ReqCounter (req, res, next) {
  counter = counter + 1;
  console.log(`reqs: ${counter}`)
  // console.count('reqs: ')
  return next();
}

// server.use(ReqCounter);

server.post('/projects', ReqCounter, (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks});

  return res.json(projects);
})

server.get('/projects', ReqCounter, (req, res) => {
  return res.json(projects);
})



server.put('/projects/:id', ReqCounter, checkIdExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;
  
  const project = projects.find(p => p.id == id)
  project.title = title

  return res.json(projects)
})

server.delete('/projects/:id', ReqCounter, checkIdExists, (req, res) => {
  const {id} = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex,1);

  return res.json(projects);

})

server.post('/projects/:id/tasks', ReqCounter, checkIdExists, (req, res) => {
  const {id} = req.params;
  const project = projects.find(p => p.id == id);

  const {title} = req.body;
  project.tasks.push(title);

  return res.json(project);
})

server.listen(3334);
