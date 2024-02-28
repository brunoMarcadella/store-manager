const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  productIdFromDB,
  productIdFromModel,
  returnFromDB,
} = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Listar todos produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(2);
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Listar produto pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    
    const inputData = 1;
    const product = await productsModel.findById(inputData);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  it('Cadastrar produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDB]);

    const inputData = { name: 'ProdutoX' };
    const result = await productsModel.insert(inputData);
    expect(result).to.equal(productIdFromModel);
  });

  it('Produto é atualizado com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromDB);

    const inputId = 1;
    const inputData = { name: 'Martelo do Batman' };
    const result = await productsModel.update(inputId, inputData);
    
    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].changedRows).to.be.equal(1);
  });

  it('Produto é deletado com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromDB);

    const inputId = 1;
    const result = await productsModel.deleteProduct(inputId);

    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].changedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});