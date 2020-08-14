// Import object from model
const {
  getAllHistory,
  getHistoryById
} = require('../model/history')
const {
  getOrderByHistoryId
} = require('../model/order')

// Import helper
const helper = require('../helper')

module.exports = {
  getAllHistory: async (request, response) => {
    try {
      const result = await getAllHistory()
      return helper.response(response, 200, 'Get History Success', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params
      const dataHistory = await getHistoryById(id)
      const dataOrder = await getOrderByHistoryId(id)
      let total = 0
      dataOrder.forEach(value => {
        total += value.order_total_price
      })
      const tax = total * 10 / 100
      const result = {
        history_id: dataHistory[0].history_id,
        invoice: dataHistory[0].history_invoice,
        orders: dataOrder,
        tax,
        subtotal: dataHistory[0].history_subtotal,
        history_created_at: dataHistory[0].history_created_at
      }
      return helper.response(response, 200, `Get History id: ${id} Success`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
