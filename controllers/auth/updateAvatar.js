const fs = require('fs/promises')
const Jimp = require('jimp')
const { Unauthorized, UnsupportedMediaType } = require('http-errors')
const path = require('path')

const { User } = require('../../model')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(UnsupportedMediaType('Error loading file'))
  }
  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file

  try {
    const avatarFileName = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, String(_id), avatarFileName)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('/avatars', String(_id), avatarFileName)
    const userAvatarImg = await Jimp.read(resultUpload)

    userAvatarImg.resize(250, 250).write(resultUpload)

    const updatedUserAvatar = await User.findOneAndUpdate(
      _id,
      { avatarURL },
      {
        new: true,
        select: '-_id -password -email -subscription -token',
        runValidators: true,
      }
    )

    if (!updatedUserAvatar) {
      throw new Unauthorized('Not authorized')
    }

    res.json({
      status: 'OK',
      code: 200,
      avatarURL: updatedUserAvatar,
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    next(error)
  }
}
module.exports = updateAvatar
