const multer = require('multer')
const path = require('path')

const MIME_TYPE_LIST = require('../utils/mimeTypesList')

const tempDir = path.join(__dirname, '../', 'temp')

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})

const mimeTypeFilter = (req, file, cb) => {
  MIME_TYPE_LIST[file.mimetype] ? cb(null, true) : cb(null, false)
}

const uploadAvatar = multer({
  storage: uploadConfig,
  mimeTypeFilter,
})

module.exports = uploadAvatar
