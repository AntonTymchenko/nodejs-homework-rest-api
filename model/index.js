const fs = require('fs/promises')
const crypto = require('crypto')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find(
    (item) => item.id === +contactId || item.id === contactId
  )
  if (!result) {
    return null
  }
  return result
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(
    (item) => item.id === contactId || item.id === +contactId
  )
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...body, id: contactId }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx]
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const indx = contacts.findIndex(
    (item) => item.id === +contactId || item.id === contactId
  )
  if (indx === -1) {
    return null
  }
  const removedContact = contacts.splice(indx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return removedContact
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { ...body, id: crypto.randomUUID() }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
