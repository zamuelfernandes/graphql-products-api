import { ApolloServer } from "apollo-server-express";
import { productSchema } from "./schema/product";
import { productResolvers } from "./resolvers/product";
import { userSchema } from "./schema/users";
import { userResolvers } from "./resolvers/users";
import { verifyToken } from "./utils/auth";

import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger";

const server = new ApolloServer({
  typeDefs: [productSchema, userSchema],
  resolvers: [productResolvers, userResolvers],
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = token ? verifyToken(token.replace("Bearer ", "")) : null;
    return { user };
  },
});

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// server.listen(4000).then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });

// Adicione o endpoint Swagger
import express from "express";
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000/graphql`)
  );
});
