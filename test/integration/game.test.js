const request = require('supertest')
const uuid = require('uuid')
const { app, games } = require('../../app')
const { wordHelper } = require('../../helpers')

// This is an unfortunate hack to stop the expiration job from running
// once the tests are done.
afterAll(() => {
  clearInterval(games.expirationJob)
})

describe('/game', () => {
  let game
  const nonexisting_valid_id = uuid.v4()

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
      const response = await request(app).get(`/game/${nonexisting_valid_id}`)
      expect(response.statusCode).toBe(404)
    })

    it('should return a 400 if the game id is invalid', async () => {
      const invalidId = 'invalid-id'
      const response = await request(app).get(`/game/${invalidId}`)
      expect(response.statusCode).toBe(400)
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

    it('should return a 400 if the game id is invalid', async () => {
      const invalidId = 'invalid-id'
      const response = await request(app).get(`/game/${invalidId}`)
      expect(response.statusCode).toBe(400)
    })

    it('should return 400 if the guess is invalid', async () => {
      const createResponse = await request(app).post('/game')
      const game = createResponse.body.data
      [ {guess: ''},
        {guess: 'fo'},
        {guess: 3 },
        {guess: true},
        {guess: null},
        {guess: undefined},
        {guess: []},
        {guess: {}},
        {guess: 'foo'},
        {guess: { foo: 'bar' }},
      ].forEach(async (guess) => {
        const response = await request(app).post(`/game/${game.id}/guess`).send(guess)
        expect(response.statusCode).toBe(400)
        const errors = JSON.parse(response.text).errors
        expect(errors[0].location).toBe("body")
        expect(errors[0].param).toBe("guess")
        expect(errors[0].msg).toBe("Invalid value")
      })
    })

    it('should return 404 if the game does not exist', async () => {
      const response = await request(app).post(`/game/${nonexisting_valid_id}/guess`).send({guess: 'f'})
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
