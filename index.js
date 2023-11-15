import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('<h1> holas </h1>')
})

const port = process.env.PORT | 5000

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`)
})
