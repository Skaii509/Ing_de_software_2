import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import userRoute from './routes/user.routes.js'

// CARGA LAS VARIABLES DE ENTORNO.
dotenv.config()

// ARRANCA APLICACION.
const app = express()

// USE
app.use(express.json())
app.use(cors())
app.use('/api/users', userRoute)

// CRUD
app.get('/', (req, res) => {
  res.send('holita holita')
})

app.use(morgan('dev'))
app.use(express.json())

export default app
