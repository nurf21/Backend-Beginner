// Import express
const router = require('express').Router()

// Import object dari controller
const {
    getAllProduct, 
    getProductById, 
    getProductByName,
    getProductNameSorted, 
    getProductCategorySorted,
    getProductDateSorted,
    getProductPriceSorted,
    postProduct, 
    patchProduct, 
    deleteProduct
} = require('../controller/product')

// [GET]
router.get('/', getAllProduct)
router.get('/id/:id', getProductById)
router.get('/search/:keyword', getProductByName)
router.get('/namesorted', getProductNameSorted)
router.get('/categorysorted', getProductCategorySorted)
router.get('/datesorted', getProductDateSorted)
router.get('/pricesorted', getProductPriceSorted)

// [POST]
router.post('/', postProduct)

// [PATCH]
router.patch('/:id', patchProduct)

// [DELETE]
router.delete('/:id', deleteProduct)

module.exports = router