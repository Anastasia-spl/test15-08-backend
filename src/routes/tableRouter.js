const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");
const { addItemValidation } = require("../middlewares/validation")

const {
  getTableController,
  searchItemController,
  addItemController,
  deleteItemController,
} = require("../controllers/tableController");

router.get("/", asyncWrapper(getTableController));
router.get("/search", asyncWrapper(searchItemController));
router.post("/",addItemValidation , asyncWrapper(addItemController));
router.delete("/:id", asyncWrapper(deleteItemController));

module.exports = { tableRouter: router };
