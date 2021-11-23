const { Conflict } = require('http-errors')
const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')
const { User } = require('../../model')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email)
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email=${email} already exist`)
  }
  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  await newUser.save()

  const avatarFolder = path.join(avatarsDir, String(newUser._id))

  await fs.mkdir(avatarFolder)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
  })
}

module.exports = register
