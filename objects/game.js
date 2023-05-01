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

  // This is a method that returns a "slim" version of the object
  // not including the word.
  state() {
    return {
      id: this.id,
      letters: this.letters,
      guesses: this.guesses,
      guessesRemaining: this.guessesRemaining,
      userWon: this.userWon(),
      userLost: this.userLost(),
      userFinished: this.userFinished(),
      revealedWord: this.revealedWord(),
    }
  }

  guess(character) {
    const letter = character.toLowerCase()

    if (this.guesses.includes(letter)) {
      return
    }

    this.guesses.push(letter)
    this.guesses = this.guesses.sort()

    if (this.word.includes(letter)) {
      this.word.split('').forEach((wordLetter, index) => {
        if (wordLetter === letter) {
          this.letters[index] = letter
        }
      })
    } else {
      this.guessesRemaining -= 1
    }
  }

  userWon() {
    return !this.letters.includes(null)
  }

  userLost() {
    return this.guessesRemaining === 0 && this.letters.includes(null)
  }
  
  userFinished() {
    return this.userWon() || this.userLost()
  }

  revealedWord() {
    return this.userFinished() ? this.word : null
  }
}

module.exports = Game
