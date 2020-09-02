// Import express
const router = require('express').Router()

// Import object from controller
const { getAllOrder, getOrderById, postOrder } = require('../controller/order')

const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { orderRedis, orderIdRedis, clearRedis } = require('../middleware/redis')

// [GET]
router.get('/', authorAdmin, orderRedis, getAllOrder)
router.get('/:id', authorAdmin, orderIdRedis, getOrderById)

// [POST]
router.post('/', authorGeneral, clearRedis, postOrder)

module.exports = router
