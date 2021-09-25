const { Tables } = require("../db/tableModel");
const { Hooks } = require("../db/webhookModel");

const { WrongParametersError , QueryError} = require("../helpers/errors");

const getTable = async ({ page, limit, }) => {
  const typedLimit = limit > 100 ? 100 : limit;
  const skip = page > 1 ? page * limit - 1 : 0;
  
  const paginatedResponse = await Tables.find({}).select({ __v: 0 }).skip(skip).limit(typedLimit);
  const allItems = await Tables.find();
  const totalItems = allItems.length;
  const totalPages = totalItems < limit ? 1 : Math.ceil(totalItems / limit);

  return { paginatedResponse, totalItems, totalPages };
};

const searchItems = async ({ name, quantity, distance, condition, page, limit }) => {
  const typedLimit = limit > 100 ? 100 : limit;
  const skip = page > 1 ? page * limit - 1 : 0;

  let response;
  let paginatedResponse;

  if (name) {
    response = await Tables.find({ name: { "$regex": `(.*)${name}(.*)?`, "$options": ["i", "x"] } });
    paginatedResponse = await Tables.find({ name: { "$regex": `(.*)${name}(.*)?`, "$options": ["i", "x"] } }).select({ __v: 0 }).skip(skip).limit(typedLimit);
  }

  const typedCondition = condition === 'equal' ? '$eq' : condition === 'more' ? "$gt" : "$lt";

  // if (!Number(quantity) || !Number(distance)) {
  //   throw new QueryError('Please provide a number');
  // }

  if (quantity) {
    if (!Number(quantity)) {
      throw new QueryError('Please provide a number');
    }
    response = await Tables.find({ quantity: { [typedCondition]: quantity } });
    paginatedResponse = await Tables.find({ quantity: { [typedCondition]: quantity } }).select({ __v: 0 }).skip(skip).limit(typedLimit)
  }

  if (distance) {
    if (!Number(distance)) {
      throw new QueryError('Please provide a number');
    }
    response = await Tables.find({ distance: { [typedCondition]: distance } });
    paginatedResponse = await Tables.find({ distance: { [typedCondition]: distance } }).select({ __v: 0 }).skip(skip).limit(typedLimit)
  }

  if (paginatedResponse.length === 0) {
    throw new QueryError('No items found')
  }
  
  const totalItems = response.length;
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

const addWebhookInfo = async (webhookinfo) => {
  const info = new Hooks({webhook: webhookinfo})
  await info.save();
  return info
};

module.exports = {
  getTable,
  searchItems,
  addItem,
  deleteItem,
  addWebhookInfo
};
