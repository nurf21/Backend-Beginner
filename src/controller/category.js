// Import object from model
const {
  getAllCategory,
  getCategoryById,
  postCategory,
  patchCategory,
  deleteCategory
} = require('../model/category')

// Import helper
const helper = require('../helper')

module.exports = {
  getAllCategory: async (request, response) => {
    try {
      const result = await getAllCategory()
      if (result.length > 0) {
        return helper.response(response, 200, 'Get All Category Success', result)
      } else {
        return helper.response(response, 404, 'Category Not Found', result)
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
      const categoryName = request.body.category_name
      const setData = {
        category_name: categoryName,
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
      const categoryName = request.body.category_name
      const setData = {
        category_name: categoryName,
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
