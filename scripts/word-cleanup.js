const fs = require('fs')
// keeping the initial word library as-is so we can re-run this script if we want to
const wordLibraryPath = 'assets/wordLibrary.txt'
const wordListPath = 'assets/wordList.txt'
const maxLength = 8
const minLength = 5

const clean = () => {
  const words = fs.readFileSync(wordLibraryPath, 'utf-8').split("\n")
  const wordList = words.filter(word => word.length <= maxLength && word.length >= minLength)
  const wordListString = wordList.join("\n")
  fs.writeFileSync(wordListPath, wordListString)
}

clean()
