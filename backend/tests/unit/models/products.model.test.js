const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
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

  afterEach(function () {
    sinon.restore();
  });
});