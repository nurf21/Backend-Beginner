// Import express
const router = require('express').Router()

// Import object from controller
const { getAllHistory, getHistoryToday, getHistoryWeek, getHistoryMonth, getHistoryById, getSumChart, getTotalIncome, getTotalIncomeYear, getCountHistoryWeek } = require('../controller/history')

const { authorAdmin } = require('../middleware/auth')

// [GET]
router.get('/', authorAdmin, getAllHistory)
router.get('/chart', authorAdmin, getSumChart)
router.get('/today', authorAdmin, getHistoryToday)
router.get('/week', authorAdmin, getHistoryWeek)
router.get('/month', authorAdmin, getHistoryMonth)
router.get('/income', authorAdmin, getTotalIncome)
router.get('/incomeyear', authorAdmin, getTotalIncomeYear)
router.get('/count', authorAdmin, getCountHistoryWeek)
router.get('/:id', authorAdmin, getHistoryById)

module.exports = router
