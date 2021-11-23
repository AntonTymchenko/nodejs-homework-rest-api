const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrentUser = require('./getCurrentUser')
const updateAvatar = require('./updateAvatar')

module.exports = {
  getCurrentUser,
  register,
  login,
  logout,
  updateAvatar,
}
