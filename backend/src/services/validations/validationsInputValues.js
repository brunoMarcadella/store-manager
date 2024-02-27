const {
  addProductSchema,
} = require('./schemas');

const validateNewProduct = (keysObjectToValidate) => {
  const { error } = addProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewProduct,
};

// const validateRequestTravel = (keysObjectToValidate) => {
//   const { error } = addRequestTravelSchema.validate(keysObjectToValidate);
//   if (error) return { status: 'INVALID_VALUE', message: error.message };
// };
