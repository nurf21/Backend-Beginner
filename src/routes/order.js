// Import express
const router = require('express').Router()

// Import object from controller
const { getAllOrder, getOrderById, postOrder } = require('../controller/order')

const { authorGeneral, authorAdmin } = require('../middleware/auth')

// [GET]
router.get('/', authorAdmin, getAllOrder)
router.get('/:id', authorAdmin, getOrderById)

// [POST]
router.post('/', authorGeneral, postOrder)

module.exports = router
