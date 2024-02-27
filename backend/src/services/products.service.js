const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (productData) => {
  const error = schema.validateNewProduct(productData);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const insertId = await productsModel.insert(productData);
  const newProduct = await productsModel.findById(insertId);

  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};