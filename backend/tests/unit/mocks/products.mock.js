const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

const productFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' }, 
};

const productIdFromDB = { insertId: 4 };

const productIdFromModel = 4;

const newProductFromModel = {
  id: 4,
  name: 'ProdutoX',
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: productFromModel,
};

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceNotFound,
  productIdFromDB,
  productIdFromModel,
  newProductFromModel,
  productFromServiceCreated,
};