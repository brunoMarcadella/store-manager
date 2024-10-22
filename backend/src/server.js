const app = require('./app');

const PORT = process.env.MYSQLPORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
