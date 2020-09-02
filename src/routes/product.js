// Import express
const router = require('express').Router()

// Import object from controller
const { getProduct, getProductByName, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

// Import auth and redis
const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { getProductByIdRedis, clearDataProductRedis } = require('../middleware/redis')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './uploads')
  },
  filename: (request, file, callback) => {
    // console.log(file)
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

// [GET]
router.get('/', authorGeneral, getProduct)
router.get('/search', authorGeneral, getProductByName)
router.get('/:id', authorGeneral, getProductByIdRedis, getProductById)

// [POST]
router.post('/', authorAdmin, upload.single('product_image'), postProduct)

// [PATCH]
router.patch('/:id', authorAdmin, clearDataProductRedis, patchProduct)

// [DELETE]
router.delete('/:id', authorAdmin, clearDataProductRedis, deleteProduct)

module.exports = router
