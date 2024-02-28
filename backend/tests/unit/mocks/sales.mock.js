const salesFromDB = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleFromDB = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleFromModel = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const salesFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const saleFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' }, 
};

const saleIdFromDB = { insertId: 3 };

const saleIdFromModel = 3;

const registerSalesBody = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const registeredSaleFromModel = {
  id: saleIdFromModel,
  itemsSold: registerSalesBody,
};

const registerFromServiceCreated = {
  status: 'CREATED',
  data: registeredSaleFromModel,
};

const deleteSaleSuccessful = { status: 'NO_CONTENT', data: {} };

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

module.exports = {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  salesFromServiceSuccessful,
  saleFromServiceSuccessful,
  saleFromServiceNotFound,
  saleIdFromDB,
  saleIdFromModel,
  registerSalesBody,
  registeredSaleFromModel,
  registerFromServiceCreated,
  deleteSaleSuccessful,
  returnFromDB,
};