const camelize = require('camelize');
const { getFormattedUpdateColumns } = require('../utils/generateFormattedQuery');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    `SELECT * FROM products
     ORDER BY id`,
  );
  return products;
};

const findAllFiltered = async (filter) => {
  if (filter === undefined) {
    const [products] = await connection.execute(
      `SELECT * FROM products
       ORDER BY id`,
    );
    return products;
  }
  const [products] = await connection.execute(
    `SELECT * FROM products
     WHERE name LIKE ?
     ORDER BY id`,
    [`%${filter}%`],
  );
  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product.name],
  );
  return insertId;
};

const update = async (productId, productData) => {
  const columns = getFormattedUpdateColumns(productData);
  const query = `UPDATE products SET ${columns} WHERE id = ?`;
  return connection.execute(query, [...Object.values(productData), productId]);
};

const deleteProduct = async (productId) => connection.execute(
  'DELETE FROM products WHERE id = ?',
  [productId],
);

const findProductByIdInSalesProduct = async (saleId, productId) => {
  const [[product]] = await connection.execute(`SELECT * FROM sales_products 
     WHERE (sale_id = ?
     AND product_id = ?)`, [saleId, productId]);
  return product;
};

const findSaleByIdInSalesProduct = async (saleId) => {
  const [[sale]] = await connection.execute(`SELECT * FROM sales_products 
     WHERE sale_id = ?`, [saleId]);
  return camelize(sale);
};

const findProductWithDate = async (saleId, productId) => {
  const [[product]] = await connection.execute(`SELECT 
      sa.date,
      sapro.product_id AS 'productId',
      sapro.quantity,
      sapro.sale_id AS 'saleId' FROM sales_products AS sapro
     INNER JOIN sales AS sa ON sapro.sale_id = sa.id 
     WHERE (sale_id = ?
     AND product_id = ?)`, [saleId, productId]);
  return product;
};

module.exports = {
  findAll,
  findAllFiltered,
  findById,
  insert,
  update,
  deleteProduct,
  findProductByIdInSalesProduct,
  findSaleByIdInSalesProduct,
  findProductWithDate,
};