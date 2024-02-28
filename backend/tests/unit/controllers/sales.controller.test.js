const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  salesFromModel,
  saleFromModel,
  salesFromServiceSuccessful,
  saleFromServiceSuccessful,
  saleFromServiceNotFound,
  registerFromServiceCreated,
  registerSalesBody,
  registeredSaleFromModel,
  deleteSaleSuccessful,
  updateQuantityProductSuccessful,
  updatedProductData,
  updateQuantityProductIdNotFound,
  updateQuantitySaleIdNotFound,
  updateQuantityInvalidValue,
} = require('../mocks/sales.mock');
const { productsModel } = require('../../../src/models');
const { productFromModel } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - SALES CONTROLLER:', function () {
  it('Listar todas as vendas com sucesso - status 200', async function () {
    sinon.stub(salesService, 'findAll').resolves(salesFromServiceSuccessful);
    
    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Listar venda pelo id com sucesso - status 200', async function () {
    sinon.stub(salesService, 'findById').resolves(saleFromServiceSuccessful);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
   
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
  });

  it('Não listar venda com id inexistente - status 404', async function () {
    sinon.stub(salesService, 'findById').resolves(saleFromServiceNotFound);

    const req = { params: { id: 99999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
   
    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Cadastrar vendas com sucesso - status 201', async function () {
    sinon.stub(salesService, 'registerSale').resolves(registerFromServiceCreated);

    const req = { body: registerSalesBody };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.registerSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(registeredSaleFromModel);
  });

  it('Não cadastrar vendas com o campo quantity menor ou igual a zero - status 422', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    const req = { body: [
      {
        productId: 1,
        quantity: 0,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
   
    await salesController.registerSale(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Venda é deletada com sucesso - status 204', async function () {
    sinon.stub(salesService, 'deleteSale').resolves(deleteSaleSuccessful);
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Venda com id inexistente não é deletada - status 404', async function () {
    sinon.stub(salesService, 'deleteSale').resolves(saleFromServiceNotFound);
    const req = { params: { id: 9999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Quantidade do produto é atualizado com sucesso - status 200', async function () {
    sinon.stub(salesService, 'updateProductQuantity').resolves(updateQuantityProductSuccessful);
    const req = { params: { saleId: 1, productId: 2 }, body: { quantity: 10 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.updateProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProductData);
  });

  it('Produto não é atualizado com quantity menor que 1 - status 422', async function () {
    sinon.stub(salesService, 'updateProductQuantity').resolves(updateQuantityInvalidValue);
    const req = { params: { saleId: 1, productId: 2 }, body: { quantity: 0 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.updateProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Produto não é atualizado com productId inexistente - status 404', async function () {
    sinon.stub(salesService, 'updateProductQuantity').resolves(updateQuantityProductIdNotFound);
    const req = { params: { saleId: 1, productId: 200 }, body: { quantity: 10 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.updateProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Produto não é atualizado com saleId inexistente - status 404', async function () {
    sinon.stub(salesService, 'updateProductQuantity').resolves(updateQuantitySaleIdNotFound);
    const req = { params: { saleId: 100, productId: 2 }, body: { quantity: 10 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.updateProductQuantity(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  afterEach(function () {
    sinon.restore();
  });
});