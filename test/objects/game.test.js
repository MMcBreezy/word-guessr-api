const { Game } = require('../../objects')
const { wordHelper } = require('../../helpers')

describe('Game', () => {
  // for all of the tests, the given word will be "foo"
  const wordHelperSpy = jest.spyOn(wordHelper, 'getRandomWord').mockReturnValue('foo')
  let game

  beforeEach(() => {
    jest.clearAllMocks()
    game = new Game()
  })

  it('should create a new game', () => {
    expect(game.id).toBeDefined()
    expect(game.word).toEqual('foo')
    expect(game.guesses).toEqual([])
    expect(game.letters).toEqual([null, null, null])
    expect(game.guessesRemaining).toEqual(6)
    expect(wordHelperSpy).toHaveBeenCalledTimes(1)
  })

  describe('state', () => {
    it('should return a slim version of the object', () => {
      const state = game.state()

      expect(state).toEqual({
        id: game.id,
        letters: game.letters,
        guesses: game.guesses,
        guessesRemaining: game.guessesRemaining,
        userWon: game.userWon(),
        userLost: game.userLost(),
        userFinished: game.userFinished(),
        revealedWord: game.revealedWord(),
      })
      expect(state.word).toBeUndefined()
      expect(wordHelperSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('guess', () => {
    it('should not add the letter to guesses if it is already in guesses', () => {
      game.guesses = ['f']

      game.guess('f')

      expect(game.guesses).toEqual(['f'])
    })

    it('should add the letter to guesses if it is not already in guesses', () => {
      game.guesses = ['f']

      game.guess('o')

      expect(game.guesses).toEqual(['f', 'o'])
    })

    it('should sort guessed letters alphabetically', () => {
      const expectedGuesses = ['a', 'b', 'c']
      game.guess('c')
      game.guess('a')
      game.guess('b')

      expect(game.guesses).toEqual(expectedGuesses)
    })

    describe('correctly', () => {
      it('should add the letter to letters', () => {
        game.letters = ['f', null, null]
  
        game.guess('o')
  
        expect(game.letters).toEqual(['f', 'o', 'o'])
      })

      it('should not subtract 1 from guesses remaining', () => {
        game.guessesRemaining = 6

        game.guess('f')

        expect(game.guessesRemaining).toEqual(6)
      })
    })

    describe('incorrectly', () => {
      it('should add the letter to guesses if it is not already in guesses', () => {
        game.guesses = ['f']

        game.guess('z')

        expect(game.guesses).toEqual(['f', 'z'])
      })

      it('should decrement remaining guesses', () => {
        game.guessesRemaining = 6

        game.guess('z')

        expect(game.guessesRemaining).toEqual(5)
      })
    })
  })

  describe('userWon', () => {
    it('should return true if all letters are revealed', () => {
      game.letters = ['f', 'o', 'o']

      expect(game.userWon()).toEqual(true)
    })

    it('should return false if not all letters are revealed', () => {
      game.letters = ['f', null, null]

      expect(game.userWon()).toEqual(false)
    })
  })

  describe('userLost', () => {
    it('should return true if all guesses are used and not all letters are revealed', () => {
      game.guessesRemaining = 0
      game.letters = ['f', null, null]

      expect(game.userLost()).toEqual(true)
    })

    it('should return false if all guesses are used and all letters are revealed', () => {
      game.guessesRemaining = 0
      game.letters = ['f', 'o', 'o']

      expect(game.userLost()).toEqual(false)
    })

    it('should return false if not all guesses are used and not all letters are revealed', () => {
      game.guessesRemaining = 5
      game.letters = ['f', null, null]

      expect(game.userLost()).toEqual(false)
    })

    it('should return false if not all guesses are used and all letters are revealed', () => {
      game.guessesRemaining = 5
      game.letters = ['f', 'o', 'o']

      expect(game.userLost()).toEqual(false)
    })
  })

  describe('userFinished', () => {
    it('should return true if user won', () => {
      game.userWon = jest.fn().mockReturnValue(true)

      expect(game.userFinished()).toEqual(true)
    })

    it('should return true if user lost', () => {
      game.userLost = jest.fn().mockReturnValue(true)

      expect(game.userFinished()).toEqual(true)
    })

    it('should return false if user has not won or lost', () => {
      game.userWon = jest.fn().mockReturnValue(false)
      game.userLost = jest.fn().mockReturnValue(false)

      expect(game.userFinished()).toEqual(false)
    })
  })

  describe('revealedWord', () => {
    it('should return the word if the game is finished', () => {
      game.userFinished = jest.fn().mockReturnValue(true)
      game.word = 'foo'

      expect(game.revealedWord()).toEqual('foo')
    })

    it('should return null if the game is not finished', () => {
      game.userFinished = jest.fn().mockReturnValue(false)

      expect(game.revealedWord()).toBeNull()
    })
  })
})
