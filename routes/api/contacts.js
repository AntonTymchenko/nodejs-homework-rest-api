const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContById,
  deleteContactById,
  addNewContact,
  contactUpdate,
} = require("../../controllers");

const { validation, controllerWrapper } = require("../../middlewares");
const { joiSchema, joiSchemaUpdate } = require("../../validations");

router.get("/", controllerWrapper(getAllContacts));

router.get("/:contactId", controllerWrapper(getContById));

router.post("/", validation(joiSchema), controllerWrapper(addNewContact));

router.delete("/:contactId", controllerWrapper(deleteContactById));

router.put("/:contactId", validation(joiSchemaUpdate), contactUpdate);

module.exports = router;
