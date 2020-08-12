// Import express
const router = require('express').Router()

// Import object dari controller
const {getAllCategory, getCategoryById, postCategory, patchCategory, deleteCategory} = require('../controller/category')
const route = require('..')

// [GET]
router.get('/', getAllCategory)
router.get('/:id', getCategoryById)

// [POST]
router.post('/', postCategory)

// [PATCH]
router.patch('/:id', patchCategory)

// [DELETE]
router.delete('/:id', deleteCategory)

module.exports = router