const express = require('express');
const router = express.Router();

const { Game } = require('../objects');

// all routes in this file begin with /game

// POST /game
router.post('/', (req, res) => {
  console.log('POST /game');

  const game = new Game();
  res.status(201).json({data: { game }});
})

module.exports = router;
