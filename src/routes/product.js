// Import express
const router = require('express').Router()

// Import object from controller
const { getProduct, getProductByName, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

// Import middleware
const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { productRedis, searchProductRedis, productIdRedis, clearRedis } = require('../middleware/redis')
const upload = require('../middleware/multer')

// [GET]
router.get('/', authorGeneral, productRedis, getProduct)
router.get('/search', authorGeneral, searchProductRedis, getProductByName)
router.get('/:id', authorGeneral, productIdRedis, getProductById)

// [POST]
router.post('/', authorAdmin, upload, clearRedis, postProduct)

// [PATCH]
router.patch('/:id', authorAdmin, upload, clearRedis, patchProduct)

// [DELETE]
router.delete('/:id', authorAdmin, clearRedis, deleteProduct)

module.exports = router
