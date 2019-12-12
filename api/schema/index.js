import { gql } from "apollo-server";
import userSchema from "./user";
import messageSchema from "./message";
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;
export default [linkSchema, userSchema, messageSchema];
