const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper')
const redis = require('redis')
const client = redis.createClient()
const qs = require('querystring')
const { postUser, checkUser, getUser, getUserCount, getUserById, patchUser } = require('../model/users')

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
  registerUser: async (request, response) => {
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt)
    const setData = {
      user_email: request.body.user_email,
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_role: 2,
      user_status: 0,
      user_created_at: new Date()
    }
    try {
      const checkEmail = await checkUser(setData.user_email)
      if (setData.user_name === '') {
        return helper.response(response, 400, 'Name cannot be empty')
      } else if (setData.user_email === '' || setData.user_email.search('@') < 0) {
        return helper.response(response, 400, 'Email cannot be empty and must be a valid email')
      } else if (checkEmail.length > 0) {
        return helper.response(response, 400, 'Email is already registered')
      } else if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
        return helper.response(response, 400, 'Password must be 8-16 characters')
      } else {
        const result = await postUser(setData)
        return helper.response(response, 200, 'Register Success ! Please contact admin to activate your account', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
    }
  },
  loginUser: async (request, response) => {
    try {
      const checkDataUser = await checkUser(request.body.user_email)
      if (checkDataUser.length >= 1) {
        const checkPassword = bcrypt.compareSync(request.body.user_password, checkDataUser[0].user_password)
        if (checkPassword) {
          let payload = {
            user_id: checkDataUser[0].user_id,
            user_email: checkDataUser[0].user_email,
            user_name: checkDataUser[0].user_name,
            user_role: checkDataUser[0].user_role,
            user_status: checkDataUser[0].user_status
          }
          if (payload.user_status === 0) {
            return helper.response(response, 400, 'Your account is already registered but not activated, please contact admin first')
          } else {
            const token = jwt.sign(payload, 'SECRET', { expiresIn: '12h' })
            payload = { ...payload, token }
            return helper.response(response, 200, 'Login Success', payload)
          }
        } else {
          return helper.response(response, 400, 'Wrong Password')
        }
      } else {
        return helper.response(response, 400, 'Email is not registered')
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request')
    }
  },
  getUser: async (request, response) => {
    let { page, limit } = request.query
    page === undefined || page === '' ? (page = 1) : (page = parseInt(page))
    limit === undefined || limit === '' ? (limit = 10) : (limit = parseInt(limit))
    const totalData = await getUserCount()
    const totalPage = Math.ceil(totalData / limit)
    const offset = page * limit - limit
    const prevLink = getPrevLink(page, request.query)
    const nextLink = getNextLink(page, totalPage, request.query)
    const pageInfo = {
      page,
      totalPage,
      limit,
      totalData,
      prevLink: prevLink && `http://127.0.0.1:3001/product?${prevLink}`,
      nextLink: nextLink && `http://127.0.0.1:3001/product?${nextLink}`
    }
    try {
      const result = await getUser(limit, offset)
      result.map(value => delete value.user_password)
      if (result.length > 0) {
        const newResult = {
          data: result,
          pagination: pageInfo
        }
        client.setex(`user:${JSON.stringify(request.query)}`, 3600, JSON.stringify(newResult))
        return helper.response(response, 200, 'Get User Success', result, pageInfo)
      } else {
        return helper.response(response, 200, 'Get User Success', [], pageInfo)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchUser: async (request, response) => {
    const salt = bcrypt.genSaltSync(10)
    const encryptPassword = bcrypt.hashSync(request.body.user_password, salt)
    const { id } = request.params
    const setData = {
      user_password: encryptPassword,
      user_name: request.body.user_name,
      user_role: request.body.user_role,
      user_status: request.body.user_status,
      user_updated_at: new Date()
    }
    try {
      if (request.body.user_password.length < 8 || request.body.user_password.length > 16) {
        return helper.response(response, 400, 'Password must be 8-16 characters')
      } else if (setData.user_name === '') {
        return helper.response(response, 400, 'Name cannot be empty')
      } else if (setData.user_role === '') {
        return helper.response(response, 400, 'Please select role')
      } else if (setData.user_status === '') {
        return helper.response(response, 400, 'Please select status')
      }
      const checkId = await getUserById(id)
      if (checkId.length > 0) {
        const result = await patchUser(setData, id)
        return helper.response(response, 201, 'User Updated', result)
      } else {
        return helper.response(response, 404, `User id: ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  }
}
