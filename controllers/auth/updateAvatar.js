const fs = require('fs/promises')
const Jimp = require('jimp')
const { Unauthorized, UnsupportedMediaType } = require('http-errors')
const path = require('path')

const { User } = require('../../model')

const userDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(UnsupportedMediaType('Error loading file'))
  }
  const { id } = req.params
  const { path: tempPath, originalname } = req.file
  const uploadPath = path.join(userDir, req.params.id, originalname)

  try {
    await fs.rename(tempPath, uploadPath)
    const avatarURL = `/public/avatars/${id}/${originalname}`
    const resultUpload = path.join(userDir, id, originalname)
    const userAvatarImage = await Jimp.read(resultUpload)

    userAvatarImage.resize(250, 250).write(resultUpload)

    const updatedUserAvatar = await User.findByIdAndUpdate(
      id,
      { avatarURL },
      { new: true }
    )
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: avatarURL,
      },
    })
    if (!updatedUserAvatar) {
      throw new Unauthorized('Not authorized')
    }
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateAvatar
