const request = require('supertest')
const app = require('../index')

describe('Auth endpoints', () => {

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ email: `test${Date.now()}@test.com`, password: '123456' })
    
    expect(response.status).toBe(200)
  })

  it('should login with valid credentials', async () => {
    const email = `test${Date.now()}@test.com`
    
    await request(app)
      .post('/api/auth/register')
      .send({ email, password: '123456' })
    
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email, password: '123456' })
    
    expect(response.status).toBe(200)
    expect(typeof response.body).toBe('string')
  })

  it('should fail login with wrong password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@test.com', password: 'wrong' })
    
    expect(response.status).toBe(400)
  })

  afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
})

})