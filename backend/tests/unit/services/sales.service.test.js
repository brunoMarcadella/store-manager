const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const {
  salesFromModel,
  saleFromModel,
  saleIdFromModel,
  registeredSaleFromModel,
  saleFromDB,
  updatedProductData,
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

  it('Venda é deletada com sucesso', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFromDB);
    sinon.stub(salesModel, 'deleteSale').resolves();
    const inputId = 1;
    const responseService = await salesService.deleteSale(inputId);

    expect(responseService.status).to.be.equal('NO_CONTENT');
  });

  it('Venda com id inexistente não é deletada', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const inputId = 9999;
    const responseService = await salesService.deleteSale(inputId);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.a('string');
    expect(responseService.data.message).to.be.equal('Sale not found');
  });

  it('Quantidade do produto é atualizada com sucesso', async function () {
    sinon.stub(productsModel, 'findSaleByIdInSalesProduct').resolves('finded');
    sinon.stub(productsModel, 'findProductByIdInSalesProduct').resolves('finded');
    sinon.stub(salesModel, 'updateProductQuantity').resolves();
    sinon.stub(productsModel, 'findProductWithDate').resolves(updatedProductData);

    const saleId = 1;
    const productId = 2;
    const inputData = { quantity: 10 };
    const responseService = await salesService.updateProductQuantity(saleId, productId, inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(updatedProductData);
  });

  it('Não atualiza quantidade do produto com quantity menor que 1', async function () {
    const saleId = 1;
    const productId = 2;
    const inputData = { quantity: 0 };
    const responseService = await salesService.updateProductQuantity(saleId, productId, inputData);

    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data.message).to.be.equal('"quantity" must be greater than or equal to 1');
  });

  it('Produto não é atualizado com saleId inexistente', async function () {
    sinon.stub(productsModel, 'findSaleByIdInSalesProduct').resolves(undefined);
    const saleId = 1000;
    const productId = 2;
    const inputData = { quantity: 10 };
    const responseService = await salesService.updateProductQuantity(saleId, productId, inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.equal('Sale not found');
  });

  it('Produto não é atualizado com productId inexistente', async function () {
    sinon.stub(productsModel, 'findSaleByIdInSalesProduct').resolves('ok');
    sinon.stub(productsModel, 'findProductByIdInSalesProduct').resolves(undefined);
    const saleId = 1;
    const productId = 2000;
    const inputData = { quantity: 10 };
    const responseService = await salesService.updateProductQuantity(saleId, productId, inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.equal('Product not found in sale');
  });

  afterEach(function () {
    sinon.restore();
  });
});