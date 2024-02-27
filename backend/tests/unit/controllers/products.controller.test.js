const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  productsFromModel,
  productFromModel,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceNotFound,
  productFromServiceCreated,
} = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Listar todos produtos com sucesso - status 200', async function () {
    sinon.stub(productsService, 'findAll').resolves(productsFromServiceSuccessful);
    
    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Listar produto pelo id com sucesso - satus 200', async function () {
    sinon.stub(productsService, 'findById').resolves(productFromServiceSuccessful);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
   
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  it('Não listar produto com id inexistente - satus 404', async function () {
    sinon.stub(productsService, 'findById').resolves(productFromServiceNotFound);

    const req = { params: { id: 99999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
   
    await productsController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Inserindo produto com sucesso - status 201', async function () {
    sinon.stub(productsService, 'createProduct').resolves(productFromServiceCreated);

    const req = { params: { }, body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});