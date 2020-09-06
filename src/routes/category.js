// Import express
const router = require('express').Router()

// Import object from controller
const { getAllCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')

const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { categoryRedis, categoryIdRedis, clearCategory } = require('../middleware/redis')

// [GET]
router.get('/', authorGeneral, categoryRedis, getAllCategory)
router.get('/:id', authorGeneral, categoryIdRedis, getCategoryById)

// [POST]
router.post('/', authorAdmin, clearCategory, postCategory)

// [PATCH]
router.patch('/:id', authorAdmin, clearCategory, patchCategory)

// [DELETE]
router.delete('/:id', authorAdmin, clearCategory, deleteCategory)

module.exports = router
