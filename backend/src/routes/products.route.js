const route = require('express').Router();
const { productsController } = require('../controllers');
const validateProductFields = require('../middlewares/validateProductFields');

route.get('/', productsController.findAll);
route.get('/search', productsController.findAllFiltered);
route.get('/:id', productsController.findById);
route.post('/', validateProductFields, productsController.createProduct);
route.put('/:id', validateProductFields, productsController.update);
route.delete('/:id', productsController.deleteProduct);

module.exports = route;
