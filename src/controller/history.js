// Import object dari model
const {
    getAllHistory,
    getHistoryById,
    postHistory,
    patchHistory
} = require('../model/history')
const { postOrder } = require('../model/order')
const { getProductById } = require('../model/product')
// Import helper
const helper = require('../helper')
const { request } = require('express')
const { response } = require('../helper')

module.exports = {
    getAllHistory: async (request, response) => {
        try {
            const result = await getAllHistory()
            if (result.length > 0) {
                return helper.response(response, 200, 'Get History Success', result)
            } else {
                return helper.response(response, 404, 'History Not Found', result)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    getHistoryById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getHistoryById(id)
            if (result.length > 0) {
                return helper.response(response, 200, `Get History by id: ${id} Success`, result)
            } else {
                return helper.response(response, 404, `History by id: ${id} Not Found`, result)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    postHistory: async (request, response) => {
        try {
            const setData = {
                history_invoice: Math.floor(100000 + Math.random() * 900000),
                history_subtotal: 0,
                history_created_at: new Date(),
            }
            const result = await postHistory(setData)
            const history_id = (result.insertId)
            const dataOrder = request.body.orders
            subTotal = 0
            for (let i = 0; i < dataOrder.length; i++) {
                const product_id2 = dataOrder[i].product_id;
                const qty2 = dataOrder[i].qty
                const result2 = await getProductById(product_id2)
                const RowDataPacket = result2[0]
                const product_price2 = RowDataPacket.product_price
                const setData2 = {
                    history_id: history_id,
                    product_id: product_id2,
                    order_qty: qty2,
                    order_total_price: qty2*product_price2
                }
                const result3 = await postOrder(setData2)
                subTotal += result3.order_total_price
            }
            const subTotal2 = subTotal+(subTotal*10/100)
            const setData3 = {
                history_subtotal: subTotal2
            }
            const result4 = await patchHistory(setData3, history_id)
            response.send('Success')
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    }
}