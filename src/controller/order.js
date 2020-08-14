// Import object from model
const {
  getAllOrder,
  getOrderById,
  getOrderByHistoryId,
  postOrder
} = require('../model/order')
const {
  getHistoryById,
  postHistory,
  patchHistory
} = require('../model/history')
const { getProductById } = require('../model/product')

// Import helper
const helper = require('../helper')

module.exports = {
  getAllOrder: async (request, response) => {
    try {
      const result = await getAllOrder()
      if (result.length > 0) {
        return helper.response(response, 200, 'Get Order Success', result)
      } else {
        return helper.response(response, 404, 'Order Not Found', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getOrderById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getOrderById(id)
      if (result.length > 0) {
        return helper.response(response, 200, `Get Order id: ${id} Success`, result)
      } else {
        return helper.response(response, 404, `Order id: ${id} Not Found`, result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postOrder: async (request, response) => {
    try {
      const setData = {
        history_invoice: Math.floor(100000 + Math.random() * 900000),
        history_subtotal: 0,
        history_created_at: new Date()
      }
      const result = await postHistory(setData)
      const historyId = result.insertId
      const dataOrder = request.body.orders
      let subTotal = 0
      for (let i = 0; i < dataOrder.length; i++) {
        const productId = dataOrder[i].product_id
        const qty = dataOrder[i].qty
        const getProduct = await getProductById(productId)
        const dataProduct = getProduct[0]
        const productPrice = dataProduct.product_price
        const setData2 = {
          history_id: historyId,
          product_id: productId,
          order_qty: qty,
          order_total_price: qty * productPrice
        }
        const result2 = await postOrder(setData2)
        subTotal += result2.order_total_price
      }
      const tax = subTotal * 10 / 100
      const afterTax = subTotal + tax
      const setData3 = {
        history_subtotal: afterTax
      }
      await patchHistory(setData3, historyId)
      const dataHistory = await getHistoryById(historyId)
      const dataOrder2 = await getOrderByHistoryId(historyId)
      const checkout = {
        history_id: dataHistory[0].history_id,
        invoice: dataHistory[0].history_invoice,
        orders: dataOrder2,
        tax,
        subtotal: dataHistory[0].history_subtotal,
        history_created_at: dataHistory[0].history_created_at
      }
      return helper.response(response, 200, 'Order Added', checkout)
    } catch (error) {
      console.log(error)
    }
  }
}
