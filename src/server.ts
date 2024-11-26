import { ApolloServer } from "apollo-server";
import { productSchema } from "./schema/product";
import { productResolvers } from "./resolvers/product";
import { verifyToken } from "./utils/auth";

const server = new ApolloServer({
  typeDefs: [productSchema],
  resolvers: [productResolvers],
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = verifyToken(token.replace("Bearer ", ""));
    return { user };
  },
});

import { generateToken } from "./utils/auth";
console.log(generateToken({ id: "123", role: "admin" }));

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});