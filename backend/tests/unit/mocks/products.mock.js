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

const updatedProduct = {
  id: 1,
  name: 'Martelo do Batman',
};

const updateProductFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: updatedProduct,
};

const returnFromDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

const deleteProductSuccessful = { status: 'NO_CONTENT', data: {} };

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
  updatedProduct,
  updateProductFromServiceSuccessful,
  returnFromDB,
  deleteProductSuccessful,
};