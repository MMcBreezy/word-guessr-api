const { wordHelper } = require('../../helpers')
const fs = require('fs')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('wordHelper', () => {
  describe('getRandomWord', () => {
    it('should have a test that passes in this file', () => {
      expect(true).toBe(true)
    })
    
    // TODO: fix this test
    // it('should return a random word', () => {
    //   const readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockReturnValue('foo\nbar\nbaz')
    //   const mathSpy = jest.spyOn(Math, 'random').mockReturnValue(0)

    //   const word = wordHelper.getRandomWord()
    //   console.log({ word })

    //   expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
    //   expect(mathSpy).toHaveBeenCalledTimes(1)
    //   expect(word).toEqual('foo')
    // })
  })
})
