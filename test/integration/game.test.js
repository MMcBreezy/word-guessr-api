const request = require('supertest')
const app = require('../../app')
const { wordHelper } = require('../../helpers')

describe('/game', () => {
  let game

  beforeEach(() => {
    jest.spyOn(wordHelper, 'getRandomWord').mockReturnValue('foo')
    jest.clearAllMocks()
  })

  describe('POST /', () => {
    it('should create a new game', async () => {
      const response = await request(app).post('/game')
      expect(response.statusCode).toBe(201)
      expect(response.body.data).toEqual({
        id: expect.any(String),
        letters: [null, null, null],
        guesses: [],
        guessesRemaining: 6,
        userWon: false,
        userLost: false,
        userFinished: false,
        revealedWord: null,
      })
    })
  })

  describe('GET /:id', () => {
    it('should return the state of the game', async () => {
      const createResponse = await request(app).post('/game')
      const game = createResponse.body.data
      const response = await request(app).get(`/game/${game.id}`)
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual({
        id: game.id,
        letters: [null, null, null],
        guesses: [],
        guessesRemaining: 6,
        userWon: false,
        userLost: false,
        userFinished: false,
        revealedWord: null,
      })
    })

    it('should return 404 if the game does not exist', async () => {
      const response = await request(app).get(`/game/does-not-exist`)
      expect(response.statusCode).toBe(404)
    })
  })

  describe('POST /:id/guess', () => {
    it('should make a guess', async () => {
      const createResponse = await request(app).post('/game')
      const game = createResponse.body.data
      const response = await request(app).post(`/game/${game.id}/guess`).send({guess: 'f'})
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual({
        id: game.id,
        letters: ['f', null, null],
        guesses: ['f'],
        guessesRemaining: 6,
        userWon: false,
        userLost: false,
        userFinished: false,
        revealedWord: null,
      })
    })

    it('should return 404 if the game does not exist', async () => {
      const response = await request(app).post(`/game/does-not-exist/guess`).send({guess: 'f'})
      expect(response.statusCode).toBe(404)
    })

    it('should delete the game if it is finished', async () => {
      const createResponse = await request(app).post('/game')
      const game = createResponse.body.data
      let response = await request(app).post(`/game/${game.id}/guess`).send({guess: 'f'})
      expect(response.statusCode).toBe(200)
      response = await request(app).post(`/game/${game.id}/guess`).send({guess: 'o'})
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual({
        id: game.id,
        letters: ['f', 'o', 'o'],
        guesses: ['f', 'o'],
        guessesRemaining: 6,
        userWon: true,
        userLost: false,
        userFinished: true,
        revealedWord: 'foo',
      })

      const getResponse = await request(app).get(`/game/${game.id}`)
      expect(getResponse.statusCode).toBe(404)
    })
  })
})
