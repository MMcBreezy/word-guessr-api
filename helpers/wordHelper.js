const fs = require('fs')

const wordLibraryPath = 'assets/wordLibrary.txt'
const wordCount = 58109 // This is the number of words in the word library

class WordHelper {
  static getRandomWord = () => {
    const randomWordIndex = Math.ceil(Math.random() * wordCount)
    const words = fs.readFileSync(wordLibraryPath, 'utf-8').split("\n")

    return words[randomWordIndex]
  }
}

module.exports = WordHelper
