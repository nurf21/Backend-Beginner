// Import object dari model
const {
    getAllHistory,
    getHistoryById,
    postHistory
} = require('../model/history')
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
            // console.log(result.insertId)
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    }
}