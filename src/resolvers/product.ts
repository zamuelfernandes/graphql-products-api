import {
  getProductById,
  deleteProductById,
  getProducts,
  updateProductById,
} from "../db/products";
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
    deleteProduct: (
      parent: any,
      args: { id: string },
      context: { user: any }
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError("User not authorized");
      }
      return !!deleteProductById(args.id);
    },
    updateProduct: (
      parent: any,
      args: { id: string; name?: string; price?: number; stock?: number },
      context: { user: any }
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError("User not authorized");
      }

      const updates = {
        name: args.name,
        price: args.price,
        stock: args.stock,
      };

      const updatedProduct = updateProductById(args.id, updates);
      if (!updatedProduct) {
        throw new Error("Product not found");
      }

      return updatedProduct;
    },
  },
};
