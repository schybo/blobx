import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import MyChart from "./MyChart.js";

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

export default function ComposedTextField() {
  const classes = useStyles();

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

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" align="center" gutterBottom>
            Brent's Savings
          </Typography>
        </Grid>
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
