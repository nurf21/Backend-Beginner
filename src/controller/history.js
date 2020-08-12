// Import object dari model
const {getAllHistory} = require('../model/history')
// Import helper
const helper = require('../helper')
const { request } = require('express')
const { response } = require('../helper')

module.exports = {
    getAllHistory: async (request, response) => {
        try {
            const result = await getAllHistory()
            if (result.length > 0) {
                return helper.response(response, 200, "Get History Success", result)
            } else {
                return helper.response(response, 404, "History Not Found", result)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    }
}