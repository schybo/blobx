import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import MyChart from "./MyChart.js";
import Login from "./Login.js";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      paddingTop: "30px"
    },
    formControl: {
      margin: theme.spacing(1)
    }
  })
);

function NumberFormatCustom(props) {
  const { inputRef, onChange, id, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          id,
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

const MESSAGES = gql`
  {
    messages {
      id
      text
      user {
        username
      }
    }
  }
`;

export default function Home() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(MESSAGES);

  const [values, setValues] = React.useState({
    // textmask: "(1  )    -    ",
    income: "6600",
    savings: "3000",
    rent: "1350",
    months: 12
  });

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" align="center" gutterBottom>
            Brent's Savings
          </Typography>
        </Grid>
        <Login></Login>
        <h1>{data.messages[0].text}</h1>
        <h1>{data.messages[1].text}</h1>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            p={1}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <TextField
              className={classes.formControl}
              label="Monthly Income"
              value={values.income}
              onChange={handleChange("income")}
              id="formatted-income-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              className={classes.formControl}
              label="Savings"
              value={values.savings}
              onChange={handleChange("savings")}
              id="formatted-savings-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              className={classes.formControl}
              label="Rent"
              value={values.rent}
              onChange={handleChange("rent")}
              id="formatted-rent-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              className={classes.formControl}
              label="Months"
              value={values.months}
              onChange={handleChange("months")}
              id="formatted-months-input"
            />
            {/* <FormControl className={classes.formControl} error>
              <InputLabel htmlFor="component-error">Name</InputLabel>
              <Input
                id="component-error"
                value={name}
                onChange={handleChange}
                aria-describedby="component-error-text"
              />
              <FormHelperText id="component-error-text">Error</FormHelperText>
            </FormControl> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            p={1}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <MyChart
              monthlyIncome={values.income}
              monthlySavings={values.savings}
              months={values.months}
              rent={values.rent}
            ></MyChart>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
