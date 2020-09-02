// Import express
const router = require('express').Router()

// Import object dari controller
const {
  getProduct,
  getProductByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct
} = require('../controller/product')

const { authorization } = require('../middleware/auth')
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
router.get('/', authorization, getProduct)
router.get('/search', getProductByName)
router.get('/:id', authorization, getProductByIdRedis, getProductById)

// [POST]
router.post('/', upload.single('product_image'), postProduct)

// [PATCH]
router.patch('/:id', clearDataProductRedis, patchProduct)

// [DELETE]
router.delete('/:id', clearDataProductRedis, deleteProduct)

module.exports = router
