import { gql } from "apollo-boost";

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(login: $username, password: $password) {
      token
    }
  }
`;

const UPDATE_FINANCE = gql`
  mutation UpdateFinance($finance: FinanceInput!) {
    updateFinance(finance: $finance) {
      id
    }
  }
`;

const CREATE_FINANCE = gql`
  mutation CreateFinance($finance: FinanceInput!) {
    createFinance(finance: $finance) {
      id
    }
  }
`;

export { SIGN_IN, UPDATE_FINANCE, CREATE_FINANCE };
