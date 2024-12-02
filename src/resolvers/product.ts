import {
  getProductById,
  deleteProductById,
  getProducts,
  updateProductById,
  insertProduct,
} from "../db/products";

import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server";

export const productResolvers = {
  Query: {
    // Resolver para listar todos os produtos
    allProducts: async (parent: any, args: any, context: { user: any }) => {
      // 1. Autorização
      if (!context.user) {
        throw new AuthenticationError("Usuário não autorizado.");
      }

      try {
        // 2. Busca dos Produtos
        const products = await getProducts();
        if (!products.length) {
          throw new UserInputError("Nenhum produto encontrado.");
        }

        return products;
      } catch (error) {
        console.log("Erro ao buscar produto:", error);

        // 3. Tratamento de Erro
        if (error instanceof ApolloError) {
          throw error; // Rejogar erros esperados
        }

        throw new ApolloError(
          "Erro interno no servidor.",
          "INTERNAL_SERVER_ERROR",
          {
            http: { status: 500 },
          }
        );
      }
    },
    // Resolver para retornar dados de um produto pelo ID
    product: async (
      parent: any,
      args: { id: string },
      context: { user: any }
    ) => {
      // 1. Autorização
      if (!context.user) {
        throw new AuthenticationError("Usuário não autorizado.");
      }

      // 2. Validação do Argumento
      if (!args.id || typeof args.id !== "string") {
        throw new UserInputError("ID Inválido fornecido.");
      }

      try {
        // 3. Busca do Produto
        const product = getProductById(args.id);
        if (!product) {
          throw new UserInputError("Produto não encontrado.");
        }

        return product;
      } catch (error) {
        console.log("Erro ao buscar produto:", error);

        // 4. Tratamento de Erro
        if (error instanceof ApolloError) {
          throw error; // Rejogar erros esperados
        }

        throw new ApolloError(
          "Erro interno no servidor.",
          "INTERNAL_SERVER_ERROR",
          {
            http: { status: 500 },
          }
        );
      }
    },
  },
  Mutation: {
    // Resolver para deletar um produto com base no ID
    deleteProduct: async (
      parent: any,
      args: { id: string },
      context: { user: any }
    ) => {
      // 1. Autorização
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError("Usuário não autorizado.");
      }

      // 2. Validação do Argumento
      if (!args.id || typeof args.id !== "string") {
        throw new UserInputError("ID Inválido fornecido.");
      }

      try {
        // 3. Busca do Produto
        const product = await !!deleteProductById(args.id);
        if (!product) {
          throw new UserInputError("Produto não encontrado.");
        }

        return product;
      } catch (error) {
        console.log("Erro ao buscar produto:", error);

        // 4. Tratamento de Erro
        if (error instanceof ApolloError) {
          throw error; // Rejogar erros esperados
        }

        throw new ApolloError(
          "Erro interno no servidor.",
          "INTERNAL_SERVER_ERROR",
          {
            http: { status: 500 },
          }
        );
      }
    },
    // Resolver para atualizar um produto com base no ID
    updateProduct: async (
      parent: any,
      args: { id: string; name?: string; price?: number; stock?: number },
      context: { user: any }
    ) => {
      // 1. Autorização
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError("Usuário não autorizado.");
      }

      // 2. Validação do Argumento
      const validations = {
        id: (value: any) =>
          typeof value === "string" || "ID inválido fornecido.",
        name: (value: any) =>
          typeof value === "string" || "Nome inválido fornecido.",
        price: (value: any) =>
          (typeof value === "number" && value >= 0) ||
          "Valor de preço inválido fornecido.",
        stock: (value: any) =>
          (typeof value === "number" && value < 0) ||
          "Valor de estoque inválido fornecido.",
      };

      Object.entries(validations).forEach(([key, validate]) => {
        if (key in args) {
          const error = validate(args[key as keyof typeof args]);
          if (error !== true) {
            throw new UserInputError(error as string);
          }
        }
      });

      const updates = {
        name: args.name,
        price: args.price,
        stock: args.stock,
      };

      try {
        // 3. Busca do Produto
        const updatedProduct = await updateProductById(args.id, updates);
        if (!updatedProduct) {
          throw new Error("Produto não encontrado.");
        }

        return updatedProduct;
      } catch (error) {
        console.log("Erro ao buscar produto:", error);

        // 4. Tratamento de Erro
        if (error instanceof ApolloError) {
          throw error; // Rejogar erros esperados
        }

        throw new ApolloError(
          "Erro interno no servidor.",
          "INTERNAL_SERVER_ERROR",
          {
            http: { status: 500 },
          }
        );
      }
    },
    // Resolver para inserir um produto 
    insertProduct: async (
      parent: any,
      args: { name: string; price: number; stock: number },
      context: { user: any }
    ) => {
      // 1. Autorização
      if (!context.user || context.user.role !== "admin") {
        throw new AuthenticationError("Usuário não autorizado.");
      }

      // 2. Validação do Argumento
      const validations = {
        name: (value: any) =>
          typeof value === "string" || "Nome inválido fornecido.",
        price: (value: any) =>
          (typeof value === "number" && value >= 0) ||
          "Valor de preço inválido fornecido.",
        stock: (value: any) =>
          (typeof value === "number" && value >= 0) ||
          "Valor de estoque inválido fornecido.",
      };

      Object.entries(validations).forEach(([key, validate]) => {
        if (key in args) {
          const error = validate(args[key as keyof typeof args]);
          if (error !== true) {
            throw new UserInputError(error as string);
          }
        }
      });

      try {
        // 3. Inserindo o Produto
        const insertedProduct = await insertProduct(
          args.name,
          args.price,
          args.stock
        );

        return insertedProduct;
      } catch (error) {
        console.log("Erro ao inserir produto:", error);

        // 4. Tratamento de Erro
        if (error instanceof ApolloError) {
          throw error; // Rejogar erros esperados
        }

        throw new ApolloError(
          "Erro interno no servidor.",
          "INTERNAL_SERVER_ERROR",
          {
            http: { status: 500 },
          }
        );
      }
    },
  },
};
