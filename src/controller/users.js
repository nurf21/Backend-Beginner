const bcrypt = require('bcrypt')
const helper = require('../helper')
const jwt = require('jsonwebtoken')
const { postUser, checkUser } = require('../model/users')

module.exports = {
  registerUser: async (request, response) => {
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt)
    // console.log(`Password : ${user_password}`)
    // console.log(`Password Bcrypt : ${encryptPassword}`)
    // kondisi jika emailnya sama tidak bisa
    const setData = {
      user_email: request.body.user_email,
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_role: 2,
      user_status: 0,
      user_created_at: new Date()
    }
    try {
      const result = await postUser(setData)
      return helper.response(response, 200, 'Register Success', result)
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
    }
  },
  loginUser: async (request, response) => {
    try {
      // const { user_email, user_password } = request.body
      // console.log(user_email)
      const checkDataUser = await checkUser(request.body.user_email)
      if (checkDataUser.length >= 1) {
        // proses 2 = cek password
        const checkPassword = bcrypt.compareSync(request.body.user_password, checkDataUser[0].user_password)
        if (checkPassword) {
          // proses 3 = set JWT
          // const {user_id, user_email, user_name, user_role, user_status} = checkDataUser[0]
          let payload = {
            user_id: checkDataUser[0].user_id,
            user_email: checkDataUser[0].user_email,
            user_name: checkDataUser[0].user_name,
            user_role: checkDataUser[0].user_role,
            user_status: checkDataUser[0].user_status
          }
          const token = jwt.sign(payload, 'SECRET', { expiresIn: '1h' })
          payload = { ...payload, token }
          return helper.response(response, 200, 'Login Success!', payload)
        } else {
          return helper.response(response, 400, 'Wrong Password')
        }
      } else {
        return helper.response(response, 400, 'Email is not registed')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
    }
  }
}
