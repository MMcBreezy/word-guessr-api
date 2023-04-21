const express = require('express')
const cors = require('cors')

// initialize the express app
const app = express()

// TODO: use env vars instead of a whitelist
const whitelist = [undefined, 'http://localhost:3000', 'ANOTHER THING!']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// enable CORS
app.use(cors(corsOptions))

// intialize the games storage
const Memory = require('./memory')
const games = new Memory()
app.use((req, _, next) => {
  req.games = games
  next()
})

// GET /heartbeat
app.get('/heartbeat', (_, res) => {
  res.send('OK')
})

app.use(express.json())

// routes
const routes = require('./routes')
app.use(routes)

module.exports = { app, games }
