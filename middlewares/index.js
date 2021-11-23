const validation = require('./validation')
const controllerWrapper = require('./controllerWrapper')
const authenticate = require('./authenticate')
const uploadAvatar = require('./uploadAvatar')

module.exports = {
  validation,
  controllerWrapper,
  authenticate,
  uploadAvatar,
}
