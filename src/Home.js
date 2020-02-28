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
      finances {
        id
        title
        type
        currency
        amount
        active
        tracked
        timespan
      }
    }
  }
`;

export default function Home() {
  const classes = useStyles();

  const [finances, setFinances] = React.useState([]);

  const [updateFinance, { updateFinanceResult }] = useMutation(
    UPDATE_FINANCE,
    {
      onCompleted(data) {
        console.log(data) // Can add back to array
      }
    }
  );

  const financeInputList = (finances) => {
    let financeInputs = []
    Object.values(finances).forEach((finance) => {
      financeInputs.push(<TextField
        key={`financeInput-${finance.id}`}
        className={classes.formControl}
        label={ finance.title }
        value={ finance.amount }
        onChange={handleChange({ 'attr': 'amount', 'finance': finance })}
        id={ `formatted-finance-input-${finance.id}` }
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
      />)
    });
    return financeInputs
  }

  const { loading, error, data } = useQuery(
    USER_DATA,
    {
      onCompleted(data) {
        let financeDict = {}
        data.me.finances.map((finance) => {
          financeDict[finance.id] = finance
        })
        setFinances(financeDict)
      }
    }
  );

  const handleChange = name => event => {
    console.log(name) // this is what is coming in from the top level input
    console.log(event)
    let newFinance = Object.assign({}, name.finance, {
      [name.attr]: event.target.value
    });
    // console.log(newFinance)

    let newFinances = Object.assign({}, finances, {
      [name.finance.id]: newFinance
    });

    setFinances(newFinances);

    // newFinances = { finance: { ...newFinances } }

    // Look into caching; this should be removed with the cache
    delete newFinance['__typename']

    updateFinance({
      variables: { finance: newFinance }
    })
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Typography variant="h1" component="h1" align="center" gutterBottom>
            {`${data ? data.me.firstName : 'No Name'}'s Savings`}
          </Typography>
        </Grid> */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            p={1}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            { financeInputList(finances) }
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
              finances= { finances }
            ></MyChart>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
