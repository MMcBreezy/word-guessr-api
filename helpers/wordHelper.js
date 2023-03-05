const fs = require('fs')

const wordLibraryPath = 'assets/wordList.txt'
const wordCount = 29800 // This is the number of words in the word list

class WordHelper {
  static getRandomWord = () => {
    const randomWordIndex = Math.ceil(Math.random() * wordCount)
    const words = fs.readFileSync(wordLibraryPath, 'utf-8').split("\n")

    return words[randomWordIndex]
  }
}

module.exports = WordHelper
