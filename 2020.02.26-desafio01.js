// 15:06:23 ~ 15:37:42 -> 31:19 mins

const express = require('express');
const server = express();

server.use(express.json());

const projects = []

function checkId(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (project) {
    return next();
  }
  return res.status(400).json({message: 'non-existant'});
}

function reqCounter(req, res, next) {
  console.count('reqs:')
  return next();
}

server.use(reqCounter)

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks });
  return res.json(projects);
})

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.put('/projects/:id',checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
})

server.delete('/projects/:id',checkId, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects.splice(projectIndex,1);
  return res.json(projects)
});

server.post('/projects/:id/tasks',checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.tasks.push({title});
  return res.json(projects);
})

server.listen(3334);