// Import connection
const connection = require('../config/mysql')

module.exports = {
    getAllHistory: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT history.history_id, history.history_invoice, orders.order_id, product.product_name, 
            orders.order_qty, orders.order_total_price, history.history_subtotal, history.history_created_at FROM history 
            INNER JOIN orders ON history.history_id = orders.history_id INNER JOIN product 
            ON orders.product_id = product.product_id`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getHistoryById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT history.history_id, history.history_invoice, orders.order_id, product.product_name, 
            orders.order_qty, orders.order_total_price, history.history_subtotal, history.history_created_at FROM history 
            INNER JOIN orders ON history.history_id = orders.history_id INNER JOIN product 
            ON orders.product_id = product.product_id WHERE history.history_id = ?`, id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    postHistory: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO history SET ?`, setData, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    patchHistory: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE history SET ? WHERE history_id = ?`, [setData, id], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}