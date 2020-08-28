// Import express
const router = require('express').Router()

// Import object dari controller
const {
  getAllHistory,
  getHistoryToday,
  getHistoryWeek,
  getHistoryMonth,
  getHistoryById,
  getSumChart,
  getTotalIncome,
  getTotalIncomeYear,
  getCountHistoryWeek
} = require('../controller/history')

// [GET]
router.get('/', getAllHistory)
router.get('/chart', getSumChart)
router.get('/today', getHistoryToday)
router.get('/week', getHistoryWeek)
router.get('/month', getHistoryMonth)
router.get('/income', getTotalIncome)
router.get('/incomeyear', getTotalIncomeYear)
router.get('/count', getCountHistoryWeek)
router.get('/:id', getHistoryById)

module.exports = router
