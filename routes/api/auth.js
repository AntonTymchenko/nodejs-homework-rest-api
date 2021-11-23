const express = require('express')

const { auth: ctrl } = require('../../controllers')

const {
  validation,
  controllerWrapper,
  authenticate,
  uploadAvatar,
} = require('../../middlewares')
const { authJoiSchema } = require('../../validations')

const router = express.Router()

router.post(
  '/register',
  validation(authJoiSchema),
  controllerWrapper(ctrl.register)
)

router.get('/current', authenticate, controllerWrapper(ctrl.getCurrentUser))

router.post('/login', validation(authJoiSchema), controllerWrapper(ctrl.login))
router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.patch(
  '/avatars/:id',
  authenticate,
  uploadAvatar.single('avatarURL'),
  controllerWrapper(ctrl.updateAvatar)
)

module.exports = router
