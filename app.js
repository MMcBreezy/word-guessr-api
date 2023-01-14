const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/heartbeat', (req, res) => {
  res.send('OK');
})

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
