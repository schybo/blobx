const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    finances: [Finance!]!
    finance(id: ID!): Finance!
  }
  extend type Mutation {
    createFinance(text: String!): Finance!
    updateFinance(rent: Int!, savings: Int!, income: Int!): Finance!
    deleteFinance(id: ID!): Boolean!
  }
  type Finance {
    id: ID!
    rent: Int!
    savings: Int!
    income: Int!
    timespan: String!
    user: User!
  }
`;
