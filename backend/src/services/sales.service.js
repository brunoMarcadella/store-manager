const { salesModel } = require('../models');

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
  const insertId = await salesModel.insertSalesTable();
  const resultados = salesData.map((sale) => salesModel.insertSalesProductsTable(insertId, sale));
  Promise.all(resultados);
  const newSale = {
    id: insertId,
    itemsSold: salesData,
  };

  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findAll,
  findById,
  registerSale,
};