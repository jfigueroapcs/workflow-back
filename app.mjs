import express from 'express'
import dotenv from 'dotenv'

import { corsMiddleware } from './src/middlewares/cors.mjs'
import { workflowRouter } from './src/routes/workflow.mjs'
dotenv.config()
const PORT = process.env.PORT ?? 1337
const SERVER = process.env.SERVER ?? 'http://localhost'
const app = express()
app.use(express.json())
app.use(corsMiddleware())
// desastivando la cabecera de express
app.disable('x-powered-by')

// Workflows
app.use('/workflow', workflowRouter)

// app.get('/', (req, res) => {
//   res.send({})
// })

// app.get('/:id', (req, res) => {
//   res.send({})
// })

// app.post('/', (req, res) => {

// })

// app.patch('/:id', (req, res) => {
//   res.status(201).json({})
// })

// app.delete('/:id', (req, res) => {
//   res.status(201).json({})
// })

app.use((req, res) => res.status(404).send('<h1>404</h1>'))

app.listen(PORT, () => {
  console.log(`server listening on port ${SERVER}:${PORT}`)
})
