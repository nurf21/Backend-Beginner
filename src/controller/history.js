const { getAllHistory, getHistoryToday, getHistoryWeek, getHistoryMonth, getHistoryCount, getSumChart, getTotalIncome, getTotalIncomeYear, getCountHistoryWeek, getHistoryById } = require('../model/history')
const { getOrderByHistoryId } = require('../model/order')
const qs = require('querystring')
const helper = require('../helper')
const redis = require('redis')
const client = redis.createClient()

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
  getAllHistory: async (request, response) => {
    let { page, limit, sort } = request.query
    page === undefined || page === '' ? page = 1 : page = parseInt(page)
    limit === undefined || limit === '' ? limit = 5 : limit = parseInt(limit)
    if (sort === undefined || sort === '') {
      sort = 'history_id'
    }
    const totalData = await getHistoryCount()
    const totalPage = Math.ceil(totalData / limit)
    const offset = page * limit - limit
    const prevLink = getPrevLink(page, request.query)
    const nextLink = getNextLink(page, totalPage, request.query)
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/history?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/history?${nextLink}`
    }
    try {
      const result = await getAllHistory(limit, offset, sort)
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistoryId(result[i].history_id)
        let total = 0
        result[i].orders.forEach(value => {
          total += value.order_total_price
        })
        const tax = total * 10 / 100
        result[i].tax = tax
      }
      const newResult = {
        data: result,
        pagination: pageInfo
      }
      client.setex(`history:${JSON.stringify(request.query)}`, 3600, JSON.stringify(newResult))
      return helper.response(response, 200, 'Success Get History', result, pageInfo)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryToday: async (request, response) => {
    try {
      const result = await getHistoryToday()
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistoryId(result[i].history_id)
        let total = 0
        result[i].orders.forEach(value => {
          total += value.order_total_price
        })
        const tax = total * 10 / 100
        result[i].tax = tax
      }
      return helper.response(response, 200, 'Success Get History', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryWeek: async (request, response) => {
    try {
      const result = await getHistoryWeek()
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistoryId(result[i].history_id)
        let total = 0
        result[i].orders.forEach(value => {
          total += value.order_total_price
        })
        const tax = total * 10 / 100
        result[i].tax = tax
      }
      return helper.response(response, 200, 'Success Get History', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryMonth: async (request, response) => {
    try {
      const result = await getHistoryMonth()
      for (let i = 0; i < result.length; i++) {
        result[i].orders = await getOrderByHistoryId(result[i].history_id)
        let total = 0
        result[i].orders.forEach(value => {
          total += value.order_total_price
        })
        const tax = total * 10 / 100
        result[i].tax = tax
      }
      return helper.response(response, 200, 'Success Get History', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getHistoryById: async (request, response) => {
    try {
      const { id } = request.params
      const dataHistory = await getHistoryById(id)
      const dataOrder = await getOrderByHistoryId(id)
      let total = 0
      dataOrder.forEach(value => {
        total += value.order_total_price
      })
      const tax = total * 10 / 100
      const result = {
        history_id: dataHistory[0].history_id,
        invoice: dataHistory[0].history_invoice,
        orders: dataOrder,
        tax,
        subtotal: dataHistory[0].history_subtotal,
        history_created_at: dataHistory[0].history_created_at
      }
      client.setex(`historyid:${id}`, 3600, JSON.stringify(result))
      return helper.response(response, 200, `Get History id: ${id} Success`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getSumChart: async (request, response) => {
    try {
      const { date } = request.query
      const result = await getSumChart(date)
      if (result.length > 0) {
        return helper.response(response, 200, 'Get Sum Success', result)
      } else {
        return helper.response(response, 200, 'Get Sum Success', [])
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getTotalIncome: async (request, response) => {
    try {
      const { date } = request.query
      const result = await getTotalIncome(date)
      return helper.response(response, 200, `Get total income ${date} Success`, result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getTotalIncomeYear: async (request, response) => {
    try {
      const { date } = request.query
      const result = await getTotalIncomeYear(date)
      return helper.response(response, 200, 'Get total income year Success', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getCountHistoryWeek: async (request, response) => {
    try {
      const { date } = request.query
      const result = await getCountHistoryWeek(date)
      return helper.response(response, 200, 'Get count history Success', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
