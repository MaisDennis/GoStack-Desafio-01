// 20:17 ~ 20:41 -> 24 mins.

const express = require('express');
const server = express();

const projects = [];

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
   if (!project) {
     return res.status(400).json({ error: 'Project does not exist'});
   };
  return next();
};

function reqCounter(req, res, next) {
  console.count('reqs: ');
  return next();
};

server.use(express.json());

server.use(reqCounter);

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks});
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  project.title = req.body.title;
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
  project.tasks.push(title);
  return res.json(project);
});

server.listen(3334);