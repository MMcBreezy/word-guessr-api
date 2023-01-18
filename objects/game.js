const uuid = require('uuid')

const { wordHelper } = require('../helpers')

class Game {
  constructor() {
    const newWord = wordHelper.getRandomWord()
    const letters = new Array(newWord.length).fill(null)

    this.id = uuid.v4()
    this.word = newWord
    this.guesses = []
    this.letters = letters
    this.guessesRemaining = 6
  }

  slim() {
    return {
      game_id: this.id,
      letters: this.letters,
      guesses: this.guesses,
      guessesRemaining: this.guessesRemaining,
    }
  }


}

module.exports = Game
