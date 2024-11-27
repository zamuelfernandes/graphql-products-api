import { gql } from "apollo-server";

export const userSchema = gql`
  type User {
    id: ID!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;
