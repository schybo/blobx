const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    finances: [Finance!]!
    finance(id: ID!): Finance!
  }
  extend type Mutation {
    createFinance(text: String!): Finance!
    updateFinance(finance: FinanceInput!): Finance!
    deleteFinance(id: ID!): Boolean!
  }
  type Finance {
    id: ID!
    rent: Int!
    savings: Int!
    income: Int!
    utilities: Int!
    timespan: String!
    user: User!
  }

  input FinanceInput {
    id: ID!
    rent: Int!
    savings: Int!
    income: Int!
    utilities: Int!
    timespan: String!
  }
`;
