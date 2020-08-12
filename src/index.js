// Import express
const route = require('express').Router()

// Import route
const product = require('./routes/product')
const category = require('./routes/category')

// buat middle disini
route.use('/product', product)
route.use('/category', category)

module.exports = route