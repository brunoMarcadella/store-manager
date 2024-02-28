const { salesModel, productsModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  return { status: 'SUCCESSFUL', data: sale };
};

const registerSale = async (salesData) => {
  const validations = salesData.map(async (sale) => {
    const error = await schema.validateNewRegisterSales(sale);
    return error;
  });
  const errors = await Promise.all(validations);
  for (let index = 0; index < errors.length; index += 1) {
    if (errors[index] !== undefined) {
      return { status: errors[index].status, data: { message: errors[index].message } };
    } 
  }

  const insertId = await salesModel.insertSalesTable();
  const resultados = salesData.map((sale) => salesModel.insertSalesProductsTable(insertId, sale));
  Promise.all(resultados);
  const newSale = {
    id: insertId,
    itemsSold: salesData,
  };

  return { status: 'CREATED', data: newSale };
};

const deleteSale = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } }; 

  await salesModel.deleteSale(saleId);
  return { status: 'NO_CONTENT', data: {} };
};

const updateProductQuantity = async (saleId, productId, updateQuantity) => {
  const object = { saleId, productId, updateQuantity };
  const error = await schema.validateUpdateQuantity(object);
  if (error) return { status: error.status, data: { message: error.message } };

  await salesModel.updateProductQuantity(saleId, productId, updateQuantity.quantity);
  const updatedProduct = await productsModel.findProductWithDate(saleId, productId);
  return { status: 'SUCCESSFUL', data: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  registerSale,
  deleteSale,
  updateProductQuantity,
};