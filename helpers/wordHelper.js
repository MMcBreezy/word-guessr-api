const fs = require('fs')

const wordListPath = 'assets/wordList.txt'
let words = null

class WordHelper {
  static getRandomWord = () => {
    if (!words) {
      words = fs.readFileSync(wordListPath, 'utf-8').split("\n")
    }
    const randomWordIndex = Math.floor(Math.random() * words.length)

    return words[randomWordIndex]
  }
}

module.exports = WordHelper
