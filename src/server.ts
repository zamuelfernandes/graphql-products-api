import { ApolloServer } from "apollo-server";
import { productSchema } from "./schema/product";
import { productResolvers } from "./resolvers/product";
import { userSchema } from "./schema/users";
import { userResolvers } from "./resolvers/users";
import { verifyToken } from "./utils/auth";

const server = new ApolloServer({
  typeDefs: [productSchema, userSchema],
  resolvers: [productResolvers, userResolvers],
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = token ? verifyToken(token.replace("Bearer ", "")) : null;
    return { user };
  },
});

server.listen(4000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
