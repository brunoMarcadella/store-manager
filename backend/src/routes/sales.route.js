const route = require('express').Router();
const { salesController } = require('../controllers');
const validateRegisterFields = require('../middlewares/validateRegisterFields');
const validateUpdateFields = require('../middlewares/validateUpdateFields');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', validateRegisterFields, salesController.registerSale);
route.delete('/:id', salesController.deleteSale);
route.put(
  '/:saleId/products/:productId/quantity', 
  validateUpdateFields,
  salesController.updateProductQuantity,
);

module.exports = route;
