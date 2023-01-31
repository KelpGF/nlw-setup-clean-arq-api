import app from './config/app'
import env from './config/env'

app.listen({ port: env.api_port })
  .then(() => {
    console.log(`Server running in http://localhost:${env.api_port}`)
  })
  .catch(console.error)
