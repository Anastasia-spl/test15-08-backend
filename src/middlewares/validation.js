const Joi = require("joi");

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {

    return res.status(400).json({message: validationResult.error.message });
  }
  next();
};

const addItemValidation = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.string().required(),
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    distance: Joi.number().required(),
  });
  checkValidation(schema, req, res, next);
};

module.exports = {
  addItemValidation,
};
