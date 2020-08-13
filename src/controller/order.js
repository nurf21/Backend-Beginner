// Import object dari model
const {
    getAllOrder,
    getOrderById,
    postOrder
} = require('../model/order')
const {getProductById, postProduct} = require('../model/product')

// Import helper
const helper = require('../helper')
const { request } = require('express')
const { response } = require('../helper')

module.exports = {
    getAllOrder: async (request, response) => {
        try {
            const result = await getAllOrder()
            if (result.length > 0) {
                return helper.response(response, 200, "Get Order Success", result)
            } else {
                return helper.response(response, 404, "Order Not Found", result)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    getOrderById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getOrderById(id)
            if (result.length > 0) {
                return helper.response(response, 200, `Get Order by id: ${id} Success`, result)
            } else {
                return helper.response(response, 404, `Order by id: ${id} Not Found`, result)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    postOrder: async (request, response) => {
        try {
            const { history_id } = request.body
            const dataOrder = request.body.orders
            for (let i = 0; i < dataOrder.length; i++) {
                const product_id2 = dataOrder[i].product_id;
                const qty2 = dataOrder[i].qty
                const result = await getProductById(product_id2)
                const RowDataPacket = result[0]
                const product_price2 = RowDataPacket.product_price
                const setData = {
                    history_id: history_id,
                    product_id: product_id2,
                    order_qty: qty2,
                    order_total_price: qty2*product_price2
                }
                const result2 = await postOrder(setData)
                response.send('Success')
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    }
}