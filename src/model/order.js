// Import connection
const connection = require('../config/mysql')

module.exports = {
    getAllOrder: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM orders', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}