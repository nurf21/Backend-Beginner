const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper')

module.exports = {
  productRedis: (request, response, next) => {
    client.get(`product:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  searchProductRedis: (request, response, next) => {
    client.get(`searchproduct:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  productIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`productid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  categoryRedis: (request, response, next) => {
    client.get('category', (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  categoryIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`categoryid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  historyRedis: (request, response, next) => {
    client.get(`history:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  historyIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`historyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  orderRedis: (request, response, next) => {
    client.get(`order:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  orderIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`orderid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  clearRedis: (request, response, next) => {
    client.flushall((error, result) => {
      !error ? console.log(result) : console.log(error)
    })
    next()
  }
}
