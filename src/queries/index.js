import { gql } from "apollo-boost";

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(login: $username, password: $password) {
      token
    }
  }
`;

const UPDATE_FINANCE = gql`
  mutation UpdateFinance($rent: Int!, $income: Int!, $savings: Int!) {
    updateFinance(rent: $rent, income: $income, savings: $savings) {
      id
    }
  }
`;

export { SIGN_IN, UPDATE_FINANCE };
