const express = require('express');
const app = express();
const port = 3000;

const routes = require('./routes');

app.get('/heartbeat', (req, res) => {
  res.send('OK');
})

app.use(routes);

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
