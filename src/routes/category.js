// Import express
const router = require('express').Router()

// Import object from controller
const { getAllCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')

const { authorGeneral, authorAdmin } = require('../middleware/auth')

// [GET]
router.get('/', authorGeneral, getAllCategory)
router.get('/:id', authorGeneral, getCategoryById)

// [POST]
router.post('/', authorAdmin, postCategory)

// [PATCH]
router.patch('/:id', authorAdmin, patchCategory)

// [DELETE]
router.delete('/:id', authorAdmin, deleteCategory)

module.exports = router
