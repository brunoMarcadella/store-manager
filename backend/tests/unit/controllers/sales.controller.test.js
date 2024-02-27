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
} = require('../mocks/sales.mock');

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

    const req = { params: { }, body: registerSalesBody };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.registerSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(registeredSaleFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});