const express = require('express')

// initialize the express app
const app = express()
const port = 3000;

// intialize the games storage
const Memory = require('./memory')
const games = new Memory()
app.use((req, res, next) => {
  req.games = games
  next()
})

// GET /heartbeat
app.get('/heartbeat', (req, res) => {
  res.send('OK')
})

app.use(express.json())

// routes
const routes = require('./routes')
app.use(routes)

app.listen(port, () => {
  console.log(`word-guessr-api listening at http://localhost:${port}`)
})
