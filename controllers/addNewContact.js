const { Contact } = require('../model')

const addNewContact = async (req, res) => {
  const newProduct = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newProduct)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = addNewContact
