// Import object from model
const { getProduct, getProductCount, getProductByName, getProductCountByName, getProductById, postProduct, patchProduct, deleteProduct } = require('../model/product')

// Import query string
const qs = require('querystring')

// Import helper
const helper = require('../helper')

const fs = require('fs')
const redis = require('redis')
const client = redis.createClient()

// Pagination
const getPrevLink = (page, currentQuery) => {
  if (page > 1) {
    const generatePage = {
      page: page - 1
    }
    const resultPrevLink = { ...currentQuery, ...generatePage }
    return qs.stringify(resultPrevLink)
  } else {
    return null
  }
}

const getNextLink = (page, totalPage, currentQuery) => {
  if (page < totalPage) {
    const generatePage = {
      page: page + 1
    }
    const resultPrevLink = { ...currentQuery, ...generatePage }
    return qs.stringify(resultPrevLink)
  } else {
    return null
  }
}

module.exports = {
  getProduct: async (request, response) => {
    let { page, limit, sort } = request.query
    page === undefined || page === '' ? (page = 1) : (page = parseInt(page))
    limit === undefined || limit === ''
      ? (limit = 9)
      : (limit = parseInt(limit))
    const totalData = await getProductCount()
    if (sort === undefined || sort === '') {
      sort = 'product_id'
    }
    const totalPage = Math.ceil(totalData / limit)
    const offset = page * limit - limit
    const prevLink = getPrevLink(page, request.query)
    const nextLink = getNextLink(page, totalPage, request.query)
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`
    }
    try {
      const result = await getProduct(sort, limit, offset)
      client.setex(`product:${JSON.stringify(request.query)}`, 3600, JSON.stringify(result))
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get Product', result, pageInfo)
      } else {
        return helper.response(response, 404, 'Product not found', result, pageInfo)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductByName: async (request, response) => {
    const { keyword } = request.query
    const limit = 100
    const totalData = await getProductCountByName(keyword)
    try {
      const searchResult = await getProductByName(keyword, limit)
      const result = {
        searchResult,
        totalData
      }
      client.setex(`searchproduct:${JSON.stringify(request.query)}`, 3600, JSON.stringify(result))
      if (searchResult.length > 0) {
        return helper.response(response, 200, 'Success Get Product', result)
      } else {
        return helper.response(response, 200, 'Product not found', [])
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductById(id)
      client.setex(`productid:${id}`, 3600, JSON.stringify(result))
      if (result.length > 0) {
        return helper.response(response, 200, 'Get Product Success', result)
      } else {
        return helper.response(response, 404, `Product by id: ${id} not found`, result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const setData = {
        product_name: request.body.product_name,
        product_image: request.file === undefined ? '' : request.file.filename,
        product_price: request.body.product_price,
        category_id: request.body.category_id,
        product_created_at: new Date(),
        product_status: request.body.product_status
      }
      if (setData.product_name === '') {
        return helper.response(response, 400, 'Name cannot be empty')
      } else if (setData.product_image === '') {
        setData.product_image = 'blank-product.jpg'
      }
      if (setData.product_price === '') {
        return helper.response(response, 400, 'Price cannot be empty')
      } else if (setData.category_id === '') {
        return helper.response(response, 400, 'Please select category')
      } else if (setData.product_status === '') {
        return helper.response(response, 400, 'Please select status')
      }
      const result = await postProduct(setData)
      return helper.response(response, 201, 'Product Added', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const setData = {
        product_name: request.body.product_name,
        product_image: request.file === undefined ? '' : request.file.filename,
        product_price: request.body.product_price,
        category_id: request.body.category_id,
        product_updated_at: new Date(),
        product_status: request.body.product_status
      }
      if (setData.product_name === '') {
        return helper.response(response, 400, 'Name cannot be empty')
      } else if (setData.product_image === '') {
        setData.product_image = 'blank-product.jpg'
      }
      if (setData.product_price === '') {
        return helper.response(response, 400, 'Price cannot be empty')
      } else if (setData.category_id === '') {
        return helper.response(response, 400, 'Please select category')
      } else if (setData.product_status === '') {
        return helper.response(response, 400, 'Please select status')
      }
      const checkId = await getProductById(id)
      if (checkId.length > 0) {
        fs.unlink(`./uploads/${checkId[0].product_image}`, async (error) => {
          if (error) {
            throw error
          } else {
            const result = await patchProduct(setData, id)
            return helper.response(response, 201, 'Product Updated', result)
          }
        })
      } else {
        return helper.response(response, 404, `Product by id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params
      const checkId = await getProductById(id)
      if (checkId.length > 0) {
        fs.unlink(`./uploads/${checkId[0].product_image}`, async (error) => {
          if (error) {
            throw error
          } else {
            const result = await deleteProduct(id)
            return helper.response(response, 201, 'Product Deleted', result)
          }
        })
      } else {
        return helper.response(response, 404, `Product by id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
