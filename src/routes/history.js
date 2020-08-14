// Import express
const router = require('express').Router()

// Import object dari controller
const {
  getAllHistory,
  getHistoryById
} = require('../controller/history')

// [GET]
router.get('/', getAllHistory)
router.get('/:id', getHistoryById)

module.exports = router
