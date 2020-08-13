// Import express
const router = require('express').Router()

// Import object dari controller
const {
    getAllHistory,
    getHistoryById,
    postHistory
} = require('../controller/history')

// [GET]
router.get('/', getAllHistory)
router.get('/:id', getHistoryById)

// [POST]
router.post('/', postHistory)

module.exports = router