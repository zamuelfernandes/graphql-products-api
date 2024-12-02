import { gql } from "apollo-server";

export const productSchema = gql`
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
`;
