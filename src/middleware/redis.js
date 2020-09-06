const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper')

module.exports = {
  productRedis: (request, response, next) => {
    client.get(`product:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, 'Success Get Product', JSON.parse(result).data, JSON.parse(result).pagination)
      } else {
        next()
      }
    })
  },
  searchProductRedis: (request, response, next) => {
    client.get(`productsearh:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, 'Success Get Product', JSON.parse(result).data)
      } else {
        next()
      }
    })
  },
  productIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`productid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, 'Get Product Success', JSON.parse(result))
      } else {
        next()
      }
    })
  },
  clearProduct: (request, response, next) => {
    client.keys('product*', (error, keys) => {
      if (!error && keys.length > 0) {
        keys.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  categoryRedis: (request, response, next) => {
    client.get('category', (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, 'Get All Category Success', JSON.parse(result))
      } else {
        next()
      }
    })
  },
  categoryIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`categoryid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, `Get Category id: ${id} Success`, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  clearCategory: (request, response, next) => {
    client.keys('category*', (error, keys) => {
      if (!error && keys.length > 0) {
        keys.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  historyRedis: (request, response, next) => {
    client.get(`history:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, 'Success Get History', JSON.parse(result).data, JSON.parse(result).pagination)
      } else {
        next()
      }
    })
  },
  historyIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`historyid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, `Get History id: ${id} Success`, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  orderRedis: (request, response, next) => {
    client.get(`historyorder:${JSON.stringify(request.query)}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, 'Get Order Success', JSON.parse(result).data, JSON.parse(result).pagination)
      } else {
        next()
      }
    })
  },
  orderIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`historyorderid:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, `Get Order id: ${id} Success`, JSON.parse(result))
      } else {
        next()
      }
    })
  },
  clearHistory: (request, response, next) => {
    client.keys('history*', (error, keys) => {
      if (!error && keys.length > 0) {
        keys.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  },
  userRedis: (request, response, next) => {
    client.get('user', (error, result) => {
      if (!error && result != null) {
        return helper.response(response, 200, 'Get User Success', JSON.parse(result))
      } else {
        next()
      }
    })
  },
  clearUser: (request, response, next) => {
    client.keys('user*', (error, keys) => {
      if (!error && keys.length > 0) {
        keys.forEach((value) => {
          client.del(value)
        })
      }
      next()
    })
  }
}
