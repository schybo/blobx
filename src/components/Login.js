import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, withStyles } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'

import React from "react";
import { SIGN_IN } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    }
});

function Login(props) {
  let username, password;
  let history = useHistory();
  const [signIn, { data }] = useMutation(
    SIGN_IN,
    {
      onCompleted(data) {
        localStorage.setItem('x-token', data.signIn.token);
        client.writeData({ data: { isLoggedIn: true } });
        history.push("/");
      }
    }
  );
  const { classes } = props;

  return (
    <React.Fragment>
      <form
          onSubmit={e => {
            e.preventDefault();
            console.log(username.value);
            console.log(password.value);
            signIn({
              variables: { username: username.value, password: password.value }
            });
            username.value = "";
            password.value = "";
          }}
        >
        <Paper className={classes.padding}>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Face />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField inputRef={node => {
                  username = node;
                }} id="username" label="Username" fullWidth autoFocus required />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField inputRef={node => {
                    password = node;
                  }} id="password" label="Password" type="password" fullWidth required />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <FormControlLabel control={
                  <Checkbox
                      color="primary"
                  />
                } label="Remember me" />
              </Grid>
              <Grid item>
                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
            </Grid>
          </div>
        </Paper>
      </form>
    </React.Fragment>
  );
}

export default withStyles(styles)(Login);
