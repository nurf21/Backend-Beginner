// Import dependencies
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Import route from src
const routerNavigation = require('./src')

// Declare variable app to use express
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
  next()
})
app.use('/', routerNavigation)

// Error handling when path is wrong
app.get('*', (request, response) => {
  response.status(404).send('Path Not Found !')
})

// Run express on host: 127.0.0.1 and port: 3001
app.listen(3001, '127.0.0.1', () => {
  console.log('Express app is listening on host: 127.0.0.1 and port: 3001')
})
