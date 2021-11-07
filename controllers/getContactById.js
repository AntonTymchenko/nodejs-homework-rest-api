const { getContactById } = require('../model/index')
const CreateError = require('http-errors')

const getContById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await getContactById(contactId)
    if (!result) {
      throw new CreateError(404, `Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContById
