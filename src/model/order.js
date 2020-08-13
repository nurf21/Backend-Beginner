// Import connection
const connection = require('../config/mysql')

module.exports = {
    getAllOrder: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT orders.order_id, orders.history_id, product.product_name, orders.order_qty, 
            orders.order_total_price FROM orders JOIN product ON orders.product_id = product.product_id`, 
            (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOrderById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT orders.order_id, orders.history_id, product.product_name, orders.order_qty, 
            orders.order_total_price FROM orders JOIN product ON orders.product_id = product.product_id 
            WHERE orders.order_id = ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOrderById2: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT orders.order_id, orders.history_id, product.product_name, orders.order_qty, 
            orders.order_total_price FROM orders INNER JOIN product ON orders.product_id = product.product_id INNER JOIN 
            history ON history.history_id = orders.history_id
            WHERE orders.history_id = ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postOrder: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO orders SET ?', setData, (error, result) => {
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
    }
}