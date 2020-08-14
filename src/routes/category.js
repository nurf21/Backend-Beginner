// Import express
const router = require('express').Router()

// Import object from controller
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory
} = require('../controller/category')

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
