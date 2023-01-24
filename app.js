const express = require('express')

// initialize the express app
const app = express()

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

module.exports = app
