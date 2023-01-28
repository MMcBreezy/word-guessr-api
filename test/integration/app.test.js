const request = require('supertest')
const { app, games } = require('../../app')

// This is an unfortunate hack to stop the expiration job from running
// once the tests are done.
afterAll(() => {
  clearInterval(games.expirationJob)
})

describe('app', () => {
  describe('GET /heartbeat', () => {
    it('should return OK', async () => {
      const response = await request(app).get('/heartbeat')
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe('OK')
    })
  })
})
