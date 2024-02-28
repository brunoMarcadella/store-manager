const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel, productsModel } = require('../../../src/models');
const {
  salesFromDB,
  salesFromModel,
  saleFromDB,
  saleFromModel,
  saleIdFromDB,
  saleIdFromModel,
  returnFromDB,
  saleFromSalesProducts,
} = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  it('Listar todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);

    const sales = await salesModel.findAll();
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(2);
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Listar venda pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    
    const inputData = 1;
    const sale = await salesModel.findById(inputData);
    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(saleFromModel);
  });
  
  it('Listar venda na tabela sales_products pelo id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[saleFromSalesProducts]]);
    
    const saleId = 1;
    const sale = await productsModel.findSaleByIdInSalesProduct(saleId);
    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal(saleFromSalesProducts);
  });

  it('Cadastrar vendas com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([saleIdFromDB])
      .onSecondCall()
      .resolves();

    const inputData = {
      productId: 1,
      quantity: 1,
    };
    const insertId = await salesModel.insertSalesTable();
    await salesModel.insertSalesProductsTable(insertId, inputData);
    expect(insertId).to.equal(saleIdFromModel);
  });

  it('Venda é deletada com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromDB);

    const inputId = 1;
    const result = await salesModel.deleteSale(inputId);

    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].changedRows).to.be.equal(1);
  });

  it('Quantidade do produto é atualizada com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromDB);

    const saleId = 1;
    const productId = 2;
    const inputData = { quantity: 10 };
    const result = await salesModel.updateProductQuantity(saleId, productId, inputData);
    
    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].changedRows).to.be.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});