const router = require('express').Router()
const { getAllOrder, getOrderById, postOrder } = require('../controller/order')
const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { orderRedis, orderIdRedis, clearHistory } = require('../middleware/redis')

router.get('/', authorAdmin, orderRedis, getAllOrder)
router.get('/:id', authorAdmin, orderIdRedis, getOrderById)

router.post('/', authorGeneral, clearHistory, postOrder)

module.exports = router
