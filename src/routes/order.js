// Import express
const router = require('express').Router()

// Import object dari controller
const {getAllOrder} = require('../controller/order')

// [GET]
router.get('/', getAllOrder)

module.exports = router