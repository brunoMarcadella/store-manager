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
  productFromSalesProducts,
  productWithDate,
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

  it('Listar produto na tabela sales_products pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromSalesProducts]]);
    
    const saleId = 1;
    const productId = 2;
    const product = await productsModel.findProductByIdInSalesProduct(saleId, productId);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromSalesProducts);
  });

  it('Listar produto na tabela sales_products pelo id incluindo a data da sua compra com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productWithDate]]);
    
    const saleId = 1;
    const productId = 2;
    const product = await productsModel.findProductWithDate(saleId, productId);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productWithDate);
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

  it('Listar todos produtos filtrados pela query "Mar" com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);
    const inputFilter = 'Mar';
    const products = await productsModel.findAllFiltered(inputFilter);
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(1);
    expect(products).to.be.deep.equal([{ id: 1, name: 'Martelo de Thor' }]);
  });

  it('Listar todos produtos filtrados pela query vazia com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromModel]);
    const inputFilter = '';
    const products = await productsModel.findAllFiltered(inputFilter);
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(2);
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Listar todos produtos filtrados pela query "Produto Inexistente" com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    const inputFilter = undefined;
    const products = await productsModel.findAllFiltered(inputFilter);
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(0);
    expect(products).to.be.deep.equal([]);
  });

  afterEach(function () {
    sinon.restore();
  });
});