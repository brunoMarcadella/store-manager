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
};