// Import express
const router = require('express').Router()

// Import object from controller
const { getProduct, getProductByName, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

// Import middleware
const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { productRedis, searchProductRedis, productIdRedis, clearProduct } = require('../middleware/redis')
const upload = require('../middleware/multer')

// [GET]
router.get('/', authorGeneral, productRedis, getProduct)
router.get('/search', authorGeneral, searchProductRedis, getProductByName)
router.get('/:id', authorGeneral, productIdRedis, getProductById)

// [POST]
router.post('/', authorAdmin, upload, clearProduct, postProduct)

// [PATCH]
router.patch('/:id', authorAdmin, upload, clearProduct, patchProduct)

// [DELETE]
router.delete('/:id', authorAdmin, clearProduct, deleteProduct)

module.exports = router
