const { NotFound, BadRequest } = require('http-errors')
const { sendMail } = require('../../helpers')
const { User } = require('../../model')

const repeatVerify = async (req, res) => {
  const { email } = req.body

  const currentUser = await User.findOne(email)
  if (!currentUser) {
    throw new NotFound('Not Found')
  }
  if (
    !currentUser.verificationToken ||
    currentUser.verificationToken.length < 1
  ) {
    throw new BadRequest('Verification is passed')
  }
  const repeatLetter = {
    to: email,
    subject: 'Confirming of registration',
    text: `<a href="http://localhost:3000/api/auth/verify/${currentUser.verificationToken}">Press to confirm your email</a>`,
  }
  await sendMail(repeatLetter)
  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email has sent',
  })
}

module.exports = repeatVerify
