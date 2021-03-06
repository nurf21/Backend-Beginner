const { getAllCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require('../model/category')
const helper = require('../helper')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const result = await getAllCategory()
      if (result.length > 0) {
        client.setex('category', 3600, JSON.stringify(result))
        return helper.response(response, 200, 'Get All Categories Success', result)
      } else {
        return helper.response(response, 200, 'Get All Categories Success', [])
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCategoryById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getCategoryById(id)
      if (result.length > 0) {
        client.setex(`categoryid:${id}`, 3600, JSON.stringify(result))
        return helper.response(response, 200, `Get Category id: ${id} Success`, result)
      } else {
        return helper.response(response, 404, `Category id: ${id} not found`, result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postCategory: async (request, response) => {
    try {
      if (request.body.category_name === '') {
        return helper.response(response, 201, 'Category name cannot be empty')
      }
      const setData = {
        category_name: request.body.category_name,
        category_created_at: new Date()
      }
      const result = await postCategory(setData)
      return helper.response(response, 201, 'Category Added', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchCategory: async (request, response) => {
    try {
      const { id } = request.params
      if (request.body.category_name === '') {
        return helper.response(response, 201, 'Category name cannot be empty')
      }
      const setData = {
        category_name: request.body.category_name,
        category_updated_at: new Date()
      }
      const checkId = await getCategoryById(id)
      if (checkId.length > 0) {
        const result = await patchCategory(setData, id)
        return helper.response(response, 201, 'Category Updated', result)
      } else {
        return helper.response(response, 404, `Category id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteCategory: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getCategoryById(id)
      if (checkId.length > 0) {
        const result = await deleteCategory(id)
        return helper.response(response, 201, 'Category Deleted', result)
      } else {
        return helper.response(response, 404, `Category id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
