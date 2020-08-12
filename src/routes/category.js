// Import express
const router = require('express').Router()

// Import object dari controller
const {getAllCategory, getCategoryById, postCategory} = require('../controller/category')

// [GET]
router.get('/', getAllCategory)
router.get('/:id', getCategoryById)

// [POST]
router.post('/', postCategory)

// [PATCH]

// [DELETE]

module.exports = router