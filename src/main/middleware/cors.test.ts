import app from '@/main/config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/', async () => ({ message: 'hello world' }))
    const response = await app.inject({
      method: 'GET',
      url: '/'
    })
    expect(response.headers['access-control-allow-origin']).toBe('*')
  })
})
