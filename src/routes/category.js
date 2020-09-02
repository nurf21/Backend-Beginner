// Import express
const router = require('express').Router()

// Import object from controller
const { getAllCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')

const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { categoryRedis, categoryIdRedis, clearRedis } = require('../middleware/redis')

// [GET]
router.get('/', authorGeneral, categoryRedis, getAllCategory)
router.get('/:id', authorGeneral, categoryIdRedis, getCategoryById)

// [POST]
router.post('/', authorAdmin, clearRedis, postCategory)

// [PATCH]
router.patch('/:id', authorAdmin, clearRedis, patchCategory)

// [DELETE]
router.delete('/:id', authorAdmin, clearRedis, deleteCategory)

module.exports = router
