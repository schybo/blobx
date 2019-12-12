import { gql } from "apollo-server";
export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }
  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }
`;
