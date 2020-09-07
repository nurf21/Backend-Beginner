// Import express
const router = require('express').Router()

// Import object from controller
const { getProduct, getProductByName, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { productRedis, searchProductRedis, productIdRedis, clearProduct } = require('../middleware/redis')
const upload = require('../middleware/multer')

router.get('/', authorGeneral, productRedis, getProduct)
router.get('/search', authorGeneral, searchProductRedis, getProductByName)
router.get('/:id', authorGeneral, productIdRedis, getProductById)

router.post('/', authorAdmin, upload, clearProduct, postProduct)

router.patch('/:id', authorAdmin, upload, clearProduct, patchProduct)

router.delete('/:id', authorAdmin, clearProduct, deleteProduct)

module.exports = router
