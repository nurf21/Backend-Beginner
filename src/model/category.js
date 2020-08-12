// Import connection
const connection = require('../config/mysql')

module.exports = {
    getAllCategory: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getCategoryById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category WHERE category_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postCategory: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO category SET ?', setData, (error, result) => {
                if (!error) {
                    const newResult = {
                        category_id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
}