import { gql } from "apollo-boost";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { UPDATE_FINANCE } from "./queries";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
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
            value: parseInt(values.value)
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

const USER_DATA = gql`
  {
    me {
      username
      firstName
      finance {
        id
        income
        savings
        rent
        utilities
        timespan
      }
    }
  }
`;

export default function Home() {
  const classes = useStyles();

  const [finances, setFinance] = React.useState({
    // textmask: "(1  )    -    ",
    income: 6600,
    savings: 3000,
    rent: 1350,
    utilities: 50,
    timespan: "year"
  });

  const [updateFinance, { updateFinanceResult }] = useMutation(
    UPDATE_FINANCE,
    {
      onCompleted(data) {
        console.log(data)
      }
    }
  );

  const { loading, error, data } = useQuery(
    USER_DATA,
    {
      onCompleted(data) {
        console.log(data)
        setFinance({
          id: data.me.finance.id,
          income: data.me.finance.income,
          savings: data.me.finance.savings,
          rent: data.me.finance.rent,
          utilities: data.me.finance.utilities,
          timespan: data.me.finance.timespan
        })
      }
    }
  );

  const handleChange = name => event => {
    console.log(event.target)
    setFinance({
      ...finances,
      [name]: event.target.value
    });

    let newFinances = Object.assign({}, finances, {
      [name]: event.target.value
    });

    newFinances = { finance: { ...newFinances } }
    console.log(newFinances)
    updateFinance({
      variables: newFinances
    })
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" align="center" gutterBottom>
            {`${data ? data.me.firstName : 'No Name'}'s Savings`}
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
              value={finances.income}
              // Should be on finished...
              onChange={handleChange("income")}
              id="formatted-income-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              className={classes.formControl}
              label="Monthly Utilities"
              value={finances.utilities}
              // Should be on finished...
              onChange={handleChange("utilities")}
              id="formatted-utilities-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              className={classes.formControl}
              label="Savings"
              value={finances.savings}
              onChange={handleChange("savings")}
              id="formatted-savings-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              className={classes.formControl}
              label="Rent"
              value={finances.rent}
              onChange={handleChange("rent")}
              id="formatted-rent-input"
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
            />
            <TextField
              className={classes.formControl}
              label="Timespan"
              value={finances.timespan}
              onChange={handleChange("timespan")}
              id="formatted-timespan-input"
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
              monthlyIncome={finances.income}
              monthlySavings={finances.savings}
              timespan={finances.timespan}
              rent={finances.rent}
            ></MyChart>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
