import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { SIGN_IN } from "./queries";
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

function Login(props) {
  let username, password;
  const [signIn, { data }] = useMutation(SIGN_IN);
  const { classes } = props;

  return (
    <React.Fragment>
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
        <Paper className={classes.padding}>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <Face />
              </Grid>
              <Grid item md={true} sm={true} xs={true}>
                <TextField ref={node => {
                  username = node;
                }} id="username" label="Username" type="email" fullWidth autoFocus required />
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
