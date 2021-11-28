const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateAvatar = require('./updateAvatar')
const verify = require('./verify')
const repeatVerify = require('./repeatVerify')

module.exports = {
  getCurrentUser,
  register,
  login,
  logout,
  updateAvatar,
  verify,
  repeatVerify,
}
