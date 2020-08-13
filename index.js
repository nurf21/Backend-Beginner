// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Import route from src
const routerNavigation = require('./src')

// Declare variable app
const app = express()

// Middleware body-parser and morgan
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Middleware endpoint
app.use('/', routerNavigation)

// Error handling when path is wrong
app.get('*', (request, response) => {
  response.status(404).send('Path Not Found !')
})

// Run express on host: 127.0.0.1 and port: 3001
app.listen(3001, '127.0.0.1', () => {
  console.log('Express app is listening on host: 127.0.0.1 and port: 3001');
});