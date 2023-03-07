const { wordHelper } = require('../../helpers')
const fs = require('fs')

let readFileSyncSpy
let mathSpy

beforeEach(() => {
  readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => 'foo\nbar\nbaz')
  mathSpy = jest.spyOn(Math, 'random').mockImplementation(() => 0)
})

afterEach(() => jest.restoreAllMocks())

describe('wordHelper', () => {
  describe('getRandomWord', () => {
    it('should return a random word', () => {
      const word = wordHelper.getRandomWord()

      expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
      expect(mathSpy).toHaveBeenCalledTimes(1)
      expect(word).toEqual('foo')
    })
  })
})
