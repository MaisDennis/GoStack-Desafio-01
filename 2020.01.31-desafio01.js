// 08:42 09:04 -> 22 mins; 

const express = require('express');
const server = express();

server.listen(3334);
server.use(express.json());

const projects =['t1', "t2", 't3'];

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const projectExists = projects.find(p => p.id == id);
  if (!projectExists) {
    return res.status(400).json( { error: 'ID does not exists'});
  }
  return next();
};

function reqCount( req, res, next) {
  console.count('reqs: ');
  return next();
}

server.use(reqCount);

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks });
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(project);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);
  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.tasks.push( title);
  return res.json(project);
});



