// Import object from model
const {
  getProduct,
  getProductCount,
  getProductCountByName,
  getProductById,
  postProduct,
  patchProduct,
  deleteProduct
} = require('../model/product')

// Import query string
const qs = require('querystring')

// Import helper
const helper = require('../helper')

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
    let { page, limit, search, sort } = request.query
    page === undefined || page === '' ? page = 1 : page = parseInt(page)
    limit === undefined || limit === '' ? limit = 3 : limit = parseInt(limit)
    let totalData = 0
    if (search === undefined) {
      search = ''
      totalData = await getProductCount()
    } else {
      totalData = await getProductCountByName(search)
    }
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
      const result = await getProduct(search, sort, limit, offset)
      if (result.length > 0) {
        return helper.response(response, 200, 'Success Get Product', result, pageInfo)
      } else {
        return helper.response(response, 404, 'Product not found', result, pageInfo)
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
      const productName = request.body.product_name
      const productImg = request.body.product_image
      const productPrice = request.body.product_price
      const categoryId = request.body.category_id
      const productStatus = request.body.product_status
      const setData = {
        product_name: productName,
        product_image: productImg,
        product_price: productPrice,
        category_id: categoryId,
        product_created_at: new Date(),
        product_status: productStatus
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
      const productName = request.body.product_name
      const productImg = request.body.product_image
      const productPrice = request.body.product_price
      const categoryId = request.body.category_id
      const productStatus = request.body.product_status
      const setData = {
        product_name: productName,
        product_image: productImg,
        product_price: productPrice,
        category_id: categoryId,
        product_updated_at: new Date(),
        product_status: productStatus
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
      const { id } = request.params
      const checkId = await getProductById(id)
      if (checkId.length > 0) {
        const result = await deleteProduct(id)
        return helper.response(response, 201, 'Product Deleted', result)
      } else {
        return helper.response(response, 404, `Product by id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
