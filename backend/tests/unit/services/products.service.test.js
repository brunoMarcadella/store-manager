const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const {
  productsFromModel,
  productFromModel,
  productIdFromModel,
  newProductFromModel,
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

  afterEach(function () {
    sinon.restore();
  });
});