const dateValidation = require('date-and-time');

const {
  getTable,
  searchItems,
  addItem,
  deleteItem,
} = require("../services/tableServices");

const { QueryError, ClientError } = require('../helpers/errors')

const getTableController = async (req, res) => {
  const {
    page = 1,
    limit = 10,
  } = req.query; 
  const {
    paginatedResponse: itemsList,
    totalItems,
    totalPages
  } = await getTable({ page, limit });
  res.json({ message: "success", itemsList, totalItems, totalPages});
};

const searchItemController = async (req, res) => {
  const {
    name,
    quantity,
    distance,
    condition,
    page = 1,
    limit = 10,
  } = req.query; 
  if (!name && !quantity && !distance) {
    throw new QueryError('Provide a query string')
  }
  const {
    paginatedResponse: itemsList,
    totalItems,
    totalPages
  } = await searchItems({ name, quantity, distance, condition, page, limit });
  res.json({ message: "success", itemsList , totalItems , totalPages});
};

const addItemController = async (req, res) => {
  const {
    date,
    name: untypedName,
    quantity,
    distance, } = req.body;
  if (!dateValidation.isValid(date, 'DD.MM.YYYY')) {
     throw new ClientError("Wrong format, expected: DD.MM.YYYY")
  }
  const item = await addItem({
    date,
    untypedName,
    quantity,
    distance,
  });
  res.json({ message: "Item successfully added", item });
};

const deleteItemController = async (req, res) => {
  const { id: itemId } = req.params;
  await deleteItem({itemId});
  res.json({ message: `Item has been successfully deleted` });
};

module.exports = {
  getTableController,
  searchItemController,
  addItemController,
  deleteItemController,
};
