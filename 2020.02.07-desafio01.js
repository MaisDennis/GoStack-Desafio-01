// 10:23 ~ 10:48 -> 25 mins.

const express = require('express');
const server = express();

server.use(express.json());

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project) {
    return res.json({error: 'ID does not exists.'});
  }
  return next();
}

function countReqs(req, res, next) {
  console.count('reqs: ');
  return next();
}

const projects = [];

server.use(countReqs);
server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks });

  return res.json(projects);
});

server.get('/projects', (Req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id );
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
  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3334);