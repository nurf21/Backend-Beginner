// Import object from model
const {
    getAllProduct, 
    getProductById,
    postProduct,
    patchProduct,
    deleteProduct
} = require('../model/product')

// Import helper
const helper = require('../helper')
const { request } = require('express')
const { response } = require('../helper')

module.exports = {
    getAllProduct: async (request, response) => {
        try {
            const result = await getAllProduct()
            if (result.length > 0) {
                return helper.response(response, 200, 'Get Product Success', result)
            } else {
                return helper.response(response, 404, 'Product Not Found', result)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    getProductById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getProductById(id)
            if (result.length > 0) {
                return helper.response(response, 200, "Get Product Success", result)
            } else {
                return helper.response(response, 404, `Product by id: ${id} not found`, result) 
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error)
        }
    },
    postProduct: async (request, response) => {
        try {
            const {product_name, product_image, product_price, category_id, product_status} = request.body
            const setData = {
                product_name,
                product_image,
                product_price,
                category_id,
                product_created_at: new Date(),
                product_status
            }
            const result = await postProduct(setData)
            return helper.response(response, 201, 'Product Added', result)
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    patchProduct: async (request, response) => {
        try {
            const {id} = request.params
            const {product_name, product_image, product_price, category_id, product_status} = request.body
            const setData = {
                product_name,
                product_image,
                product_price,
                category_id,
                product_updated_at: new Date(),
                product_status
            }
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await patchProduct(setData, id)
                return helper.response(response, 201, 'Product Updated', result)
            } else {
                return helper.response(response, 404, `Product by id: ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    },
    deleteProduct: async (request, response) => {
        try {
            const {id} = request.params
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await deleteProduct(id)
                return helper.response(response, 201, "Product Deleted", result)
            } else {
                return helper.response(response, 404, `Product by id: ${id} Not Found`)
            }
        } catch (error) {
            return helper.response(response, 400, 'Bad Request', error)
        }
    }
}