const express = require('express')
const cors = require('cors')

// initialize the express app
const app = express()

const whitelist = [undefined, 'http://localhost:3000', 'ANOTHER THING!']

const corsOptions = {
  origin: function (origin, callback) {
    console.log({ origin })
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
