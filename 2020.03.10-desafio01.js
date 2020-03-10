// 15:06:55 ~ 15:33:39 -> 26:44

const express = require('express');
const server = express();

server.use(express.json());

const projects = []

function checkIdExists ( req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (project) {
    return next()
  } else {
    return res.status(400).json({ message: 'Id does not exist'});
  }
};

function reqCount (req, res, next) {
  console.count('reqCount: ');
  return next();
}

server.use(reqCount);

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
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
});

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects.splice(projectIndex,1);
  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExists, ( req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id === id);
  project.tasks.push(title);
  return res.json(project);
})

server.listen(3334);