// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// Import router
const routerNavigation = require('./src')

// Deklarasikan variable app
const app = express()

// Middleware body-parser dan morgan
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(morgan('dev'))

// Middleware router
app.use('/', routerNavigation)

// Handling error ketika salah path
app.get('*', (request, response) => {
  response.status(404).send('Path Not Found !')
})

// Menjalankan express
app.listen(3001, '127.0.0.1', () => {
  console.log('Express app is listening on host: 127.0.0.1 and port: 3001');
});