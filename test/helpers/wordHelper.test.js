const { wordHelper } = require('../../helpers')
const fs = require('fs')

describe('wordHelper', () => {
  describe('getRandomWord', () => {
    it('should return a random word', () => {
      const readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockReturnValue('foo\nbar\nbaz')
      const mathSpy = jest.spyOn(Math, 'random').mockReturnValue(0)

      const word = wordHelper.getRandomWord()

      expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
      expect(mathSpy).toHaveBeenCalledTimes(1)
      expect(word).toEqual('foo')
    })
  })
})
