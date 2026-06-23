import cors from 'cors'
import express from 'express'
import { router as pontosRouter } from './routes/pontos.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get(['/health', '/api/health'], (_request, response) => {
  response.json({
    name: 'Mapa Solidario Maceio API',
    status: 'ok',
  })
})

app.use(pontosRouter)
app.use('/api', pontosRouter)

export { app }
