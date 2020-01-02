import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { SIGN_IN } from "./queries";

function Login() {
  let username, password;
  const [signIn, { data }] = useMutation(SIGN_IN);
  console.log(data);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          signIn({
            variables: { username: username.value, password: password.value }
          });
          username.value = "";
          password.value = "";
        }}
      >
        <input
          ref={node => {
            username = node;
          }}
        />
        <input
          ref={node => {
            password = node;
          }}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
