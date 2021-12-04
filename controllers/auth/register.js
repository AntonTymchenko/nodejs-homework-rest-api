const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')
const { User } = require('../../model')
const { sendMail } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email, { protocol: 'http' })
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email=${email} already exist`)
  }
  const verificationToken = nanoid()
  const newUser = new User({ email, avatarURL, verificationToken })
  newUser.setPassword(password)
  await newUser.save()
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации ',
    html: `<a href="http:loaclhost:3000/api/auth/verify/${verificationToken}">Нажмите для подтверждения реагистрации</a>`,
  }
  await sendMail(mail)

  const avatarFolder = path.join(avatarsDir, String(newUser._id))

  await fs.mkdir(avatarFolder)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
  })
}

module.exports = register
