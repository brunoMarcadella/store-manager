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

// const pointSchema = Joi.string().min(3);

// const waypointSchema = Joi.object({
//   address: pointSchema,
//   stopOrder: Joi.number().integer().min(1),
// });

// const addRequestTravelSchema = Joi.object({
//   passengerId: idSchema,
//   startingAddress: pointSchema,
//   endingAddress: pointSchema.invalid(Joi.ref('startingAddress')),
//   waypoints: Joi.array().items(waypointSchema),
// });