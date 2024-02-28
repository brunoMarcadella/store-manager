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

const validateUpdateProduct = async (keysObjectToValidate) => {
  const { error } = addProductSchema.validate(keysObjectToValidate.productData);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
  const product = await productsModel.findById(keysObjectToValidate.productId);
  if (!product) return { status: 'NOT_FOUND', message: 'Product not found' };
};

const validateUpdateQuantity = async (keysObjectToValidate) => {
  const { error } = registerSalesSchema.validate(keysObjectToValidate.updateQuantity);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
  const sale = await productsModel.findSaleByIdInSalesProduct(keysObjectToValidate.saleId);
  if (!sale) return { status: 'NOT_FOUND', message: 'Sale not found' };
  const product = await productsModel.findProductByIdInSalesProduct(
    keysObjectToValidate.saleId,
    keysObjectToValidate.productId,
  );
  if (!product) return { status: 'NOT_FOUND', message: 'Product not found in sale' };
};

module.exports = {
  validateNewProduct,
  validateNewRegisterSales,
  validateUpdateProduct,
  validateUpdateQuantity,
};