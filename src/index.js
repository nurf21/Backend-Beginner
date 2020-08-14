// Import express
const route = require('express').Router()

// Import from routes
const product = require('./routes/product')
const category = require('./routes/category')
const history = require('./routes/history')
const order = require('./routes/order')

// Middleware
route.use('/product', product)
route.use('/category', category)
route.use('/history', history)
route.use('/order', order)

module.exports = route
