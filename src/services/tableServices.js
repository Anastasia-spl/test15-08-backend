const { Tables } = require("../db/TableModel");

const { WrongParametersError} = require("../helpers/errors");

const getTable = async ({ page, limit, }) => {
  const typedLimit = limit > 100 ? 100 : limit;
  const skip = page > 1 ? page * limit - 1 : 0;
  
  const paginatedResponse = await Tables.find({}).select({ __v: 0 }).skip(skip).limit(typedLimit);
  return { paginatedResponse };
};

const searchItems = async ({ name, quantity, distance, page, limit }) => { 
   const typedLimit = limit > 100 ? 100 : limit;
  const skip = page > 1 ? page * limit - 1 : 0;
  const queryName = name ? "name" : quantity ? "quantity" : "distance";
  let typedName;
  if (name) {
    typedName = name.toLowerCase();
  }
  const queryValue = typedName || quantity || distance;
  const paginatedResponse = await Tables.find({[queryName]: queryValue}).select({ __v: 0 }).skip(skip).limit(typedLimit);
  const queriedItems = await Tables.find({ [queryName]: queryValue });
  const totalItems = queriedItems.length;
  const totalPages = totalItems < limit ? 1 : Math.ceil(totalItems / limit);
  return { paginatedResponse, totalItems, totalPages };
};

const addItem = async ({ date, untypedName, quantity, distance, }) => {
  const name = untypedName.toLowerCase();
  const item = new Tables({ date, name, quantity, distance, });
  await item.save();
  return item;
};

const deleteItem = async ({ itemId }) => {
  const itemToRemove = await Tables.findByIdAndRemove(itemId);
  if (!itemToRemove) {
    throw new WrongParametersError('No contact with this id')
  }
};

module.exports = {
  getTable,
  searchItems,
  addItem,
  deleteItem,
};
