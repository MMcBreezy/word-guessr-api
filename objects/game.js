const uuid = require("uuid");
const { wordHelper } = require("../helpers");

class Game {
  constructor(word) {
    const letters = new Array(word.length).fill(null);
    this.id = uuid.v4();
    this.word = word;
    this.guesses = [];
    this.letters = letters;
    this.guessesRemaining = 6;
  }

  // Static async method to create a new game
  static async newGame() {
    try {
      const newWord = await wordHelper.getRandomWord();
      return new Game(newWord);
    } catch (error) {
      console.error("Error generating a new game:", error);
      throw error;
    }
  }

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
    };
  }

  guess(character) {
    const letter = character.toLowerCase()

    if (this.guesses.includes(letter)) {
      return;
    }

    this.guesses.push(letter);
    this.guesses = this.guesses.sort();

    if (this.word.includes(letter)) {
      this.word.split("").forEach((wordLetter, index) => {
        if (wordLetter === letter) {
          this.letters[index] = letter;
        }
      });
    } else {
      this.guessesRemaining -= 1;
    }
  }

  userWon() {
    return !this.letters.includes(null);
  }

  userLost() {
    return this.guessesRemaining === 0 && this.letters.includes(null);
  }

  userFinished() {
    return this.userWon() || this.userLost();
  }

  revealedWord() {
    return this.userFinished() ? this.word : null;
  }
}

module.exports = Game;
