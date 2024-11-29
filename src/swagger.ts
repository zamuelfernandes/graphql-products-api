import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentação da API GraphQL",
      version: "1.0.0",
      description: "Esta é a documentação da API GraphQL com exemplos de consultas e mutações.",
    },
    servers: [
      {
        url: "http://localhost:4000/graphql",
        description: "Servidor local",
      },
    ],
    tags: [
      {
        name: "GraphQL Queries",
        description: "Operações de consultas e mutações na API",
      },
    ],
    components: {
      schemas: {
        // Esquema do Produto
        Product: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID único do produto",
              example: "01",
            },
            name: {
              type: "string",
              description: "Nome do produto",
              example: "\"Product A\"",
            },
            price: {
              type: "number",
              description: "Preço do produto",
              example: 100.0,
            },
            stock: {
              type: "integer",
              description: "Quantidade em estoque",
              example: 50,
            },
          },
        },
        // Esquema do Usuário
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID único do usuário",
              example: "01",
            },
            role: {
              type: "string",
              description: "Papel do usuário (e.g., admin ou user)",
              example: "\"admin\"",
            },
            email: {
              type: "string",
              description: "Email do usuário",
              example: "\"examplo@gmail.com\"",
            },
            password: {
              type: "string",
              description: "Senha do usuário criptografada",
              example: "\"password123\"",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Caminho para arquivos que contenham comentários com documentação
  apis: ["./src/documentation/swagger_comments.ts"], 
};
