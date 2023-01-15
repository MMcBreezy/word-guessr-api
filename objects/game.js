const { wordHelper } = require('../helpers')

class Game {
  constructor() {
    this.word = wordHelper.getRandomWord()
    this.guesses = []
    this.guessesRemaining = 6
  }
}

module.exports = Game
