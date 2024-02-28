const route = require('express').Router();
const { salesController } = require('../controllers');
const validateRegisterFields = require('../middlewares/validateRegisterFields');

route.get('/', salesController.findAll);
route.get('/:id', salesController.findById);
route.post('/', validateRegisterFields, salesController.registerSale);
route.delete('/:id', salesController.deleteSale);

module.exports = route;
