const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const {
  productsFromModel,
  productFromModel,
  productIdFromModel,
  newProductFromModel,
  updatedProduct,
  productFromDB,
} = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS SERVICE:', function () {
  it('Listar todos produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromModel);
    const responseData = [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
    ];

    const responseService = await productsService.findAll();

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('array');
    expect(responseService.data).to.have.lengthOf(2);
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Listar produto pelo id com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);
    const responseData = {
      id: 1,
      name: 'Martelo de Thor',
    };
    
    const inputData = 1;
    const responseService = await productsService.findById(inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(responseData);
  });

  it('Não listar produto com id inexistente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    
    const inputData = 99999;
    const responseService = await productsService.findById(inputData);

    expect(responseService.status).to.be.equal('NOT_FOUND');
    expect(responseService.data.message).to.be.a('string');
    expect(responseService.data.message).to.be.equal('Product not found');
  });

  it('Inserindo produto com sucesso', async function () {
    sinon.stub(productsModel, 'insert').resolves(productIdFromModel);
    sinon.stub(productsModel, 'findById').resolves(newProductFromModel);

    const inputData = { name: 'ProdutoX' };
    const responseService = await productsService.createProduct(inputData);

    expect(responseService.status).to.be.equal('CREATED');
    expect(responseService.data).to.be.deep.equal({
      id: 4,
      name: 'ProdutoX',
    });
  });

  it('Não insere produto com name menor que 5 caracteres', async function () {
    const inputData = { name: 'Pro' };
    const responseService = await productsService.createProduct(inputData);

    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data.message).to.be.equal('"name" length must be at least 5 characters long');
  });

  it('Produto é atualizado com sucesso', async function () {
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves(productFromDB)
      .onSecondCall()
      .resolves(updatedProduct);
    sinon.stub(productsModel, 'update').resolves();

    const inputId = 1;
    const inputData = { name: 'Martelo do Batman' };
    const responseService = await productsService.update(inputId, inputData);

    expect(responseService.status).to.be.equal('SUCCESSFUL');
    expect(responseService.data).to.be.an('object');
    expect(responseService.data).to.be.deep.equal(updatedProduct);
  });

  it('Não atualiza produto com name menor que 5 caracteres', async function () {
    const inputId = 1;
    const inputData = { name: 'Pro' };
    const responseService = await productsService.update(inputId, inputData);

    expect(responseService.status).to.be.equal('INVALID_VALUE');
    expect(responseService.data.message).to.be.equal('"name" length must be at least 5 characters long');
  });

  afterEach(function () {
    sinon.restore();
  });
});