# 🚀 API GraphQL para Gestão de Usuários e Produtos

Este projeto é uma implementação básica de uma API GraphQL desenvolvida com Apollo Server, focada no gerenciamento de produtos e usuários. A API simula um banco de dados em memória, fornecendo funcionalidades como consulta, listagem e exclusão de produtos com suporte a autenticação JWT.

---

## ⚙️ **Instalação**

1. Clone o repositório:

   ```bash
   git clone https://github.com/zamuelfernandes/graphql-products-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

- O servidor estará disponível em [http://localhost:4000/graphql](http://localhost:4000/graphql).
- Com sua documentação Swagger disponível em [http://localhost:4000/swagger-api-doc](http://localhost:4000/swagger-api-doc).

---

## 🛠️ **Configuração**

- **Node.js**: Certifique-se de ter o Node.js instalado na versão 14 ou superior.
- **Ambiente**: A API utiliza autenticação JWT. Gere um token com uma query de login para acessar as operações protegidas.

---

## 💻 **Tecnologias Utilizadas**

- **Node.js**: Ambiente de execução JavaScript.
- **Apollo Server**: Framework para implementar servidores GraphQL.
- **GraphQL**: Linguagem de consulta e manipulação de dados.
- **JWT (JSON Web Tokens)**: Implementação de autenticação e autorização.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Swagger**: Para documentação de utilização.

---

## 🗂️ **Estrutura do Projeto**

### 1. **server.ts: Configuração do Servidor**

- **Dependências principais**:
  - **ApolloServer**: Framework GraphQL.
  - **Esquemas e resolvers**: `productSchema` e `productResolvers`.
  - **Autenticação**: `verifyToken` e `generateToken`.

- **Autenticação JWT**:
  - Gera e valida tokens para proteger operações específicas.
  - Tokens são validados e incluídos no contexto das requisições.

---

### 2. **db/products.ts: Banco de Dados Simulado**

- Contém a lista de produtos simulada em memória.
- **Funções principais**:
  - `getProductById(id)`: Retorna um produto específico.
  - `getProducts()`: Retorna todos os produtos.
  - `deleteProductById(id)`: Remove um produto pelo ID.
  - `insertProduct(id)`: Remove um produto pelo ID.
  
---

### 3. **schema/products.ts: Esquema GraphQL**

Define os tipos e operações suportadas:

```gql
type Product {
  id: ID!
  name: String!
  price: Float!
  stock: Int!
}

type Query {
   product(id: ID!): Product
   allProducts: [Product!]!
}

type Mutation {
    deleteProduct(id: ID!): Boolean
    updateProduct(id: ID!, name: String, price: Float, stock: Int): Product
    insertProduct(name: String!, price: Float!, stock: Int!) : Product
}
```

---

### 4. **resolvers/product.ts: Implementação dos Resolvers**

- **Consultas**:
  - `product`: Busca um produto pelo ID.
  - `allProducts`: Retorna todos os produtos.

- **Mutations**:
  - `deleteProduct`: Remove um produto. Requer autenticação de administrador.
  - `updateProduct`: Atualizar um produto. Requer autenticação de administrador.
  - `insertProduct`: Inserir um produto. Requer autenticação de administrador.

---

## 📌 **Uso**

### 🔐 **Autenticação**

A API utiliza JWT para proteger operações. Um token de exemplo para o usuário admin é gerado no console. Inclua-o no cabeçalho da requisição GraphQL:

```http
Authorization: Bearer <seu-token>
```

### 📊 **Exemplos de Queries e Mutations**

1. **Listar todos os produtos:**

   ```gql
   query {
     allProducts {
       id
       name
       price
       stock
     }
   }
   ```

2. **Buscar produto por ID:**

   ```gql
   query {
     product(id: "1") {
       name
       price
     }
   }
   ```

3. **Deletar um produto (requer admin):**

   ```gql
   mutation {
     deleteProduct(id: "1")
   }
   ```

3. **Atualizar um produto (requer admin):**

   ```gql
   mutation {
     updateProduct(id: "2", name: "Updated Product C", stock: 35) {id, name, price, stock}
   }
   ```

3. **Inserir um produto (requer admin):**

   ```gql
   mutation {
     insertProduct(name: "New Product F", price: 600, stock: 5) {id, name, price, stock}
   }
   ```
