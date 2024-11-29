import { ApolloServer } from "apollo-server-express";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { applyMiddleware } from "graphql-middleware"; 
import { makeExecutableSchema } from "@graphql-tools/schema"; 


import { productSchema } from "./schema/product";
import { productResolvers } from "./resolvers/product";
import { userSchema } from "./schema/users";
import { userResolvers } from "./resolvers/users";
import { verifyToken } from "./utils/auth";
import { swaggerOptions } from "./swagger";
import { logger, loggingMiddleware } from "./logger";

const completeSchema = makeExecutableSchema({
  typeDefs: [productSchema, userSchema],
  resolvers: [productResolvers, userResolvers],
});

const shemaWithMiddleware = applyMiddleware(completeSchema, loggingMiddleware);

const server = new ApolloServer({
  // typeDefs: [productSchema, userSchema],
  // resolvers: [productResolvers, userResolvers],
  schema: shemaWithMiddleware,
  plugins: [
    {
      async requestDidStart(reqContext) {
        logger.info(`Nova requisição: ${JSON.stringify(reqContext.request)}`);
        return {
          async didEncounterErrors(context) {
            for (const err of context.errors) {
              logger.error(`Erro: ${err.message}`);
            }
          }
        }
      }
    }
  ],
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = token ? verifyToken(token.replace("Bearer ", "")) : null;
    return { user };
  },
});

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Adicione o endpoint Swagger
const app = express();

app.use("/swagger-api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000/graphql`);
    console.log(`Documentation ready at http://localhost:4000/swagger-api-doc`);
  });
});
