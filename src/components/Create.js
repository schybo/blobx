import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, withStyles } from '@material-ui/core';
import { Face } from '@material-ui/icons'

import React from "react";
import { CREATE_FINANCE } from "../queries";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(1)
    }
});

function Create(props) {
  let title;
  let history = useHistory();
  const client = useApolloClient();
  const [createFinance, { data }] = useMutation(
    CREATE_FINANCE,
    {
      onCompleted(data) {
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
            console.log(title.value);
            createFinance({
              variables: { finance: { title: title.value } }
            });
            title.value = "";
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
                  title = node;
                }} id="title" label="Title" fullWidth autoFocus required />
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Create</Button>
            </Grid>
          </div>
        </Paper>
      </form>
    </React.Fragment>
  );
}

export default withStyles(styles)(Create);
