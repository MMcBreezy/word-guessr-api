const express = require('express');
const bodyParser = require('body-parser');
const Memory = require('./memory');
const mem = new Memory();
const app = express();
const port = 3000;

app.use(bodyParser.json());

const routes = require('./routes');

app.get('/heartbeat', (req, res) => {
  res.send('OK');
})

app.use(routes);

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
