const express = require('express');
const path = require('path');
const { pathToFileURL } = require('url');

const app = express();
const port = 3001;

app.use(express.json());

async function loadHandler(relativePath) {
  const absolutePath = pathToFileURL(path.resolve(__dirname, relativePath));
  const module = await import(absolutePath.href);
  return module.default;
}

(async () => {
  const authHandler = await loadHandler('api/auth.js');
  const studentHandler = await loadHandler('api/student.js');
  const dashboardHandler = await loadHandler('api/dashboard.js');
  const challengeHandler = await loadHandler('api/challenges/[day].js');
  const progressHandler = await loadHandler('api/progress.js');
  const achievementsHandler = await loadHandler('api/achievements.js');
  const githubProofHandler = await loadHandler('api/proof/github.js');
  const linkedinProofHandler = await loadHandler('api/proof/linkedin.js');
  const completeChallengeHandler = await loadHandler('api/challenges/[day]/complete.js');
  const dayTwelveHandler = await loadHandler('api/day/12.js');

  app.post('/api/auth/login', (req, res) => authHandler(req, res));
  app.get('/api/student', (req, res) => studentHandler(req, res));
  app.get('/api/dashboard', (req, res) => dashboardHandler(req, res));
  app.get('/api/challenges/:day', (req, res) => challengeHandler(req, res));
  app.get('/api/progress', (req, res) => progressHandler(req, res));
  app.get('/api/achievements', (req, res) => achievementsHandler(req, res));
  app.get('/api/day/12', (req, res) => dayTwelveHandler(req, res));
  app.post('/api/day/12/github', (req, res) => dayTwelveHandler(req, res));
  app.post('/api/day/12/linkedin', (req, res) => dayTwelveHandler(req, res));
  app.post('/api/day/12/complete', (req, res) => dayTwelveHandler(req, res));
  app.post('/api/proof/github', (req, res) => githubProofHandler(req, res));
  app.post('/api/proof/linkedin', (req, res) => linkedinProofHandler(req, res));
  app.post('/api/challenges/:day/complete', (req, res) => completeChallengeHandler(req, res));

  app.listen(port, () => {
    console.log(`ABTalks API listening on http://localhost:${port}`);
  });
})();
