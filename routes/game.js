const express = require('express')
const router = express.Router()

const { Game } = require('../objects')

// all routes in this file begin with /game

// POST /game
router.post('/', (req, res) => {
  console.log('POST /game')

  // create and save a new game
  const game = new Game()
  req.games.set(game.id, game)

  res.status(201).json({data: game.slim()})
})

// GET /game/:game_id
router.get('/:game_id', (req, res) => {
  console.log('GET /game/:game_id');

  const game = req.games.get(req.params.game_id)
  if (game) {
    res.json({data: game.slim()})
  } else {
    res.status(404).send()
  }
})


module.exports = router
