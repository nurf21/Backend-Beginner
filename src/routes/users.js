const router = require('express').Router()
const { registerUser, loginUser, getUser, patchUser } = require('../controller/users')
const { authorAdmin } = require('../middleware/auth')
const { userRedis, clearUser } = require('../middleware/redis')

router.get('/', authorAdmin, userRedis, getUser)

router.post('/login', loginUser)
router.post('/register', clearUser, registerUser)

router.patch('/:id', authorAdmin, clearUser, patchUser)

module.exports = router
