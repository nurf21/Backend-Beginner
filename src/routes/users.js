const router = require('express').Router()
const { registerUser, loginUser, getUser, getUserById, patchUser, refreshToken } = require('../controller/users')
const { authorGeneral, authorAdmin } = require('../middleware/auth')
const { userRedis, userIdRedis, clearUser } = require('../middleware/redis')

router.get('/', authorAdmin, userRedis, getUser)
router.get('/:id', authorGeneral, userIdRedis, getUserById)

router.post('/login', loginUser)
router.post('/register', clearUser, registerUser)
router.post('/refresh', refreshToken)

router.patch('/:id', authorAdmin, clearUser, patchUser)

module.exports = router
