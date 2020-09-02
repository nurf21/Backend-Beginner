// Import express
const router = require('express').Router()

// Import object from controller
const { getProduct, getProductByName, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

// Import middleware
const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { getProductByIdRedis, clearDataProductRedis } = require('../middleware/redis')
const upload = require('../middleware/multer')

// [GET]
router.get('/', authorGeneral, getProduct)
router.get('/search', authorGeneral, getProductByName)
router.get('/:id', authorGeneral, getProductByIdRedis, getProductById)

// [POST]
router.post('/', authorAdmin, upload.single('product_image'), postProduct)

// [PATCH]
router.patch('/:id', authorAdmin, upload.single('product_image'), clearDataProductRedis, patchProduct)

// [DELETE]
router.delete('/:id', authorAdmin, clearDataProductRedis, deleteProduct)

module.exports = router
