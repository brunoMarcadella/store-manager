const { productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findAllFiltered = async (filter) => {
  const products = await productsModel.findAllFiltered(filter);
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

const update = async (productId, productData) => {
  const object = { productId, productData };
  const error = await schema.validateUpdateProduct(object);
  if (error) return { status: error.status, data: { message: error.message } };

  await productsModel.update(productId, productData);
  const updatedProduct = await productsModel.findById(productId);
  return { status: 'SUCCESSFUL', data: updatedProduct };
};

const deleteProduct = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } }; 

  await productsModel.deleteProduct(productId);
  return { status: 'NO_CONTENT', data: {} };
};

module.exports = {
  findAll,
  findAllFiltered,
  findById,
  createProduct,
  update,
  deleteProduct,
};