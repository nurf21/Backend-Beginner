// Import express
const router = require('express').Router()

// Import object from controller
const { getAllOrder, getOrderById, postOrder } = require('../controller/order')

const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { orderRedis, orderIdRedis, clearHistory } = require('../middleware/redis')

// [GET]
router.get('/', authorAdmin, orderRedis, getAllOrder)
router.get('/:id', authorAdmin, orderIdRedis, getOrderById)

// [POST]
router.post('/', authorGeneral, clearHistory, postOrder)

module.exports = router
