import { getProductById, deleteProductById, products } from "../db/products";
import { AuthenticationError } from "apollo-server";

export const productResolvers = {
  Query: {
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
      return products; // Retorna todos os produtos
    },
  },
  Mutation: {
    deleteProduct: (parent: any, args: { id: string }, context: { user: any }) => {
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError("User not authorized");
      }
      return !!deleteProductById(args.id);
    },
  },
};
