const connection = require('../config/mysql')

module.exports = {
  postUser: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO user SET ?', setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.user_password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  checkUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id, user_email, user_password, user_name, user_role, user_status FROM user WHERE user_email = ?', email, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getUser: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  patchUser: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE user SET ? WHERE user_id = ?', [setData, id], (error, result) => {
        if (!error) {
          const newResult = {
            user_id: id,
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
