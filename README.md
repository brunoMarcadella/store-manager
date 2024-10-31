# Store Manager 🏪 

# Contexto
Este projeto trata-se de uma API RESTful desenvolvida em arquitetura em camadas responsável pelo gerenciamento de vendas em que é possível criar, visualizar, deletar e atualizar produtos e vendas. O banco de dados utilizado é o MySQL e há testes implementados para garantir o bom funcionamento da aplicação. Todo código foi feito dentro das pastas /src e /tests sendo os arquivos fora dessas pastas entregues pronto pela Trybe para realização do projeto. 

## Técnologias usadas

Back-end:
> Desenvolvido usando: Docker, MySQL e Testes com Mocha, Chai e Sinon.


## Instalando Dependências

> Backend
```bash
cd store-manager/backend 
npm install
```


## Executando aplicação

* Para rodar o back-end:

  ```
  docker compose up -d
  ```


## Executando Testes

* Para rodar todos os testes:

  ```
    npm run test:mocha
  ```

  
## Tabelas do Banco de Dados
![image](https://github.com/user-attachments/assets/5c90c26a-0d0f-4455-8149-3b586283e4ba)


## Endpoints
* GET /products -> retorna todos os produtos ordenados de forma crescente pelo id;
  
* GET /products/:id -> retorna o produto com o id presente na URL;
  
* GET /sales -> retorna todas as vendas ordenadas de forma crescente pelo saleId e se houver empate pelo pŕoductId;
  
* GET /sales/:id -> retorna a venda com o id presente na URL;
  
* POST /products -> salva o produto enviado na tabela "products", sendo necessário enviar o "name" do produto com pelo menos 5 caracteres;
  
* POST /sales -> salva as vendas nas tabelas sales e sales_products sendo necessário enviar o "productId" do produto vendido e a sua "quantity" vendida;
  
* PUT /products/:id -> atualiza o "name" do produto com o id presente na URL;
  
* DELETE /products/:id -> deleta o produto com o id presente na URL;
  
* DELETE /sales/:id -> deleta a venda com o id presente na URL;
  
* PUT /sales/:saleId/products/:productId/quantity -> atualiza a quantidade de um produto (productId) em uma venda (saleId) através do corpo da requisição com o parâmetro "quantity";
  
* GET /products/search -> pesquisa por um produto que tenha o mesmo valor em "name" que o valor da query "q", por exemplo, ao pesquisar /products/search?q=Martelo o produto com o "name" igual a Martelo é retornado.
