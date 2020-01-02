import { gql } from "apollo-boost";

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(login: $username, password: $password) {
      token
    }
  }
`;

export { SIGN_IN };
