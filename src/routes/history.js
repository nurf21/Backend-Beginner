// Import express
const router = require('express').Router()

// Import object dari controller
const {getAllHistory} = require('../controller/history')

// [GET]
router.get('/', getAllHistory)

module.exports = router