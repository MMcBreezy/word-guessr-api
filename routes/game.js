const express = require('express')
const uuid = require('uuid')
const router = express.Router()

const { Game } = require('../objects')

// all routes in this file begin with /game

// POST /game
// Create a new game
router.post('/', (req, res) => {
  console.log('POST /game')

  // create and save a new game
  const game = new Game()
  req.games.set(game.id, game)

  res.status(201).json({data: game.state()})
})

// BEGIN middleware to attach a game to the request
// Routes below this line require a valid id
router.use('/:id', (req, res, next) => {
  const id = req.params.id

  if (!uuid.validate(id)) {
    console.log('Invalid id', id)
    return res.status(400).send()
  }
  console.log(`id: ${id}`)
  const game = req.games.get(id)

  if (game) {
    req.game = game
    next()
  } else {
    console.log('Game not found')
    res.status(404).send()
  }
})
// END middleware to attach a game to the request

// GET /game/:id
// Get the state of a game
router.get('/:id', (req, res) => {
  const game = req.game

  res.json({data: game.state()})
})

// POST /game/:id/guess
// Make a guess
router.post('/:id/guess', (req, res) => {
  const guess = req.body.guess  // TODO: validate guess
  const game = req.game
  console.log(`POST /game/${game.id}/guess`, guess)

  game.guess(guess)

  if (game.userFinished()) {
    req.games.delete(game.id)
  }
  
  res.json({data: game.state()})
})

module.exports = router
