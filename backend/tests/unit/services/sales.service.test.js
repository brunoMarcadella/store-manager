const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const {
  salesFromModel,
  saleFromModel,
  saleIdFromModel,
  registeredSaleFromModel,
} = require('../mocks/sales.mock');
const { productFromModel } = require('../mocks/products.mock');

describe('Realizando testes - SALES SERVICE:', function () {
  it('Listar todas as vendas com sucesso', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromModel);
    const responseData = [
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

    const responseService = await salesService.findAll();

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(2);
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Listar venda pelo id com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromModel);
    const responseData = [
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
    
    const inputData = 1;
    const responseService = await salesService.findById(inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Não listar venda com id inexistente', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    
    const inputData = 99999;
    const responseService = await salesService.findById(inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.a('string');
    expect(responseService.data.message).to.be.equal('Sale not found');
  });

  it('Cadastrar vendas com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    sinon.stub(salesModel, 'insertSalesTable').resolves(saleIdFromModel);
    sinon.stub(salesModel, 'insertSalesProductsTable').resolves();

    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const responseService = await salesService.registerSale(inputData);

    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(registeredSaleFromModel);
  });

  it('Não cadastrar vendas com o campo quantity menor ou igual a zero', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    const inputData = [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const responseService = await salesService.registerSale(inputData);

    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  afterEach(function () {
    sinon.restore();
  });
});