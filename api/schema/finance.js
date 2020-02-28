const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    finances: [Finance!]!
    finance(id: ID!): Finance!
  }
  extend type Mutation {
    createFinance(finance: FinanceInput!): Finance!
    updateFinance(finance: FinanceInput!): Finance!
    deleteFinance(id: ID!): Boolean!
  }
  type Finance {
    id: ID!
    title: String!
    type: String!
    currency: String!
    amount: Int!
    active: Boolean!
    color: String!
    tracked: Boolean!
    timespan: String!
    user: User!
  }

  input FinanceInput {
    id: ID
    title: String!
    type: String!
    currency: String!
    amount: Int!
    color: String!
    active: Boolean!
    tracked: Boolean!
    timespan: String!
  }
`;
