import { getProductById, deleteProductById, getProducts } from "../db/products";
import { AuthenticationError } from "apollo-server";

export const productResolvers = {
  Query: {
    // Resolver para retornar dados de um produto pelo ID
    product: (parent: any, args: { id: string }, context: { user: any }) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }
      return getProductById(args.id);
    },
    // Resolver para listar todos os produtos
    allProducts: (parent: any, args: any, context: { user: any }) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }
      return getProducts;
    },
  },
  Mutation: {
    // Resolver para deletar um produto com base no ID
    deleteProduct: (parent: any, args: { id: string }, context: { user: any }) => {
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError("User not authorized");
      }
      return !!deleteProductById(args.id);
    },
  },
};
