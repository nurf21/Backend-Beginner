const redis = require('redis')
const client = redis.createClient()
const helper = require('../helper')

module.exports = {
  getProductByIdRedis: (request, response, next) => {
    const { id } = request.params
    client.get(`getproductbyid:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('Data ada di dalam redis')
        return helper.response(response, 200, JSON.parse(result))
      } else {
        console.log('Data tidak ada di dalam redis')
        next()
      }
    })
  },
  // tambahkan get all product
  clearDataProductRedis: (request, response, next) => {
    client.flushall((error, result) => {
      !error ? console.log(result) : console.log(error)
    })
    next()
  }
}
