const express = require('express')
const cors = require('cors')

// initialize the express app
const app = express()

// enable CORS
app.use(cors({
  origin: 'http://localhost:3000'
}))

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

module.exports = { app, games }
