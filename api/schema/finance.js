const { gql } = require("apollo-server");
module.exports = gql`
  extend type Query {
    finances: [Finance!]!
    finance(id: ID!): Finance!
  }
  extend type Mutation {
    createFinance(text: String!): Finance!
    deleteFinance(id: ID!): Boolean!
  }
  type Finance {
    id: ID!
    rent: Integer!
    savings: Integer!
    income: Integer!
    timespan: String!
    user: User!
  }
`;
