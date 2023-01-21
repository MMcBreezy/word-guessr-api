const request = require('supertest')
const app = require('../../app')

describe('app', () => {
  describe('GET /heartbeat', () => {
    it('should return OK', async () => {
      const response = await request(app).get('/heartbeat')
      expect(response.statusCode).toBe(200)
      expect(response.text).toBe('OK')
    })
  })
})
