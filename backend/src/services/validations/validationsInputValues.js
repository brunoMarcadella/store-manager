const { productsModel } = require('../../models');
const {
  addProductSchema,
  registerSalesSchema,
} = require('./schemas');

const validateNewProduct = (keysObjectToValidate) => {
  const { error } = addProductSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateNewRegisterSales = async (keysObjectToValidate) => {
  const { error } = registerSalesSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
  const product = await productsModel.findById(keysObjectToValidate.productId);
  if (!product) return { status: 'NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  validateNewProduct,
  validateNewRegisterSales,
};

// const validateRequestTravel = (keysObjectToValidate) => {
//   const { error } = addRequestTravelSchema.validate(keysObjectToValidate);
//   if (error) return { status: 'INVALID_VALUE', message: error.message };
// };
