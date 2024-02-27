const express = require('express');
const { productsRoutes } = require('./routes');

const app = express();
require('express-async-errors');

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
app.use('/products', productsRoutes);

module.exports = app;
