const express = require('express');
const bodyParser = require('body-parser');
const Memory = require('./memory');
const app = express();
const port = 3000;

const games = new Memory();

app.use(bodyParser.json());

const routes = require('./routes');

app.get('/heartbeat', (req, res) => {
  res.send('OK');
})

app.use((req, res, next) => {
  req.games = games;
  next();
})

app.use(routes);

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
