const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sapro.sale_id, sa.date, sapro.product_id, sapro.quantity FROM sales_products AS sapro
     INNER JOIN products AS pro ON sapro.product_id = pro.id
     INNER JOIN sales AS sa ON sapro.sale_id = sa.id 
     ORDER BY sale_Id, product_Id`,
  );
  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT sa.date, sapro.product_id, sapro.quantity FROM sales_products AS sapro 
    INNER JOIN products AS pro ON sapro.product_id = pro.id 
    INNER JOIN sales AS sa ON sapro.sale_id = sa.id 
    WHERE sapro.sale_id = ? 
    ORDER BY sale_Id, product_Id`, 
    [saleId],
  );
  return camelize(sale);
};

module.exports = {
  findAll,
  findById,
};