const router = require('express').Router()
const { getAllCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../controller/category')
const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { categoryRedis, categoryIdRedis, clearCategory } = require('../middleware/redis')

router.get('/', authorGeneral, categoryRedis, getAllCategory)
router.get('/:id', authorGeneral, categoryIdRedis, getCategoryById)

router.post('/', authorAdmin, clearCategory, postCategory)

router.patch('/:id', authorAdmin, clearCategory, patchCategory)

router.delete('/:id', authorAdmin, clearCategory, deleteCategory)

module.exports = router
