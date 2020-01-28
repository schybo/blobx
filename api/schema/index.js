const { gql } = require("apollo-server");
const userSchema = require("./user");
const messageSchema = require("./message");
const financeSchema = require("./finance");
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
module.exports = [linkSchema, userSchema, messageSchema, financeSchema];
