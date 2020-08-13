// Import express
const router = require('express').Router()

// Import object dari controller
const {
    getAllOrder, 
    getOrderById
} = require('../controller/order')

// [GET]
router.get('/', getAllOrder)
router.get('/:id', getOrderById)

module.exports = router