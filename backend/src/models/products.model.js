const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    `SELECT * FROM products
     ORDER BY id`,
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

module.exports = {
  findAll,
  findById,
  insert,
};