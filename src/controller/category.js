// Import object dari model
const {getAllCategory, getCategoryById, postCategory} = require('../model/category')
// Import helper
const helper = require('../helper')
const { request } = require('express')
const { response } = require('../helper')

module.exports = {
    getAllCategory: async (request, response) => {
        try {
            const result = await getAllCategory()
            if (result.length > 0) {
                return helper.response(response, 200, "Get Category Success", result)
            } else {
                return helper.response(response, 404, "Category Not Found", result)
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        } 
    },
    getCategoryById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getCategoryById(id)
            if (result.length > 0) {
                return helper.response(response, 200, "Get Category Success", result)
            } else {
                return helper.response(response, 404, `Category by id: ${id} not found`, result) 
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    postCategory: async (request, response) => {
        try {
            const {category_name} = request.body
            const setData = {
                category_name,
                category_created_at: new Date(),
        }
        const result = await postCategory(setData)
        return helper.response(response, 201, "Category Added", result)
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    }
}