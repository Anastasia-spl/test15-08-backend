const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");
const { addItemValidation } = require("../middlewares/validation")

const {
  getTableController,
  searchItemController,
  addItemController,
  deleteItemController,
  webhookController
} = require("../controllers/tableController");

router.get("/", asyncWrapper(getTableController));
router.get("/search", asyncWrapper(searchItemController));
router.post("/",addItemValidation , asyncWrapper(addItemController));
router.delete("/:id", asyncWrapper(deleteItemController));
router.post("/testwebhook", asyncWrapper(webhookController))

module.exports = { tableRouter: router };
