const Joi = require('joi');

const idSchema = Joi.number().integer().min(1);

const addProductSchema = Joi.object({
  name: Joi.string().min(5),
});

const registerSalesSchema = Joi.object({
  productId: idSchema,
  quantity: Joi.number().integer().min(1),
});

module.exports = {
  addProductSchema,
  registerSalesSchema,
};