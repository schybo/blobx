import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";

import MyChart from './MyChart.js'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1)
    }
  })
);

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

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
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [name, setName] = React.useState("Composed TextField");
  const labelRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const classes = useStyles();

  const [values, setValues] = React.useState({
    textmask: "(1  )    -    ",
    income: "1320",
    savings: "700"
  });

  const handleChange = name => event => {
    console.log(name);
    console.log(event);
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  React.useEffect(() => {
    setLabelWidth(labelRef.current.offsetWidth);
  }, []);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };

  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="formatted-text-mask-input">
          react-text-mask
        </InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange("textmask")}
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
      <TextField
        className={classes.formControl}
        label="react-number-format"
        value={values.income}
        onChange={handleChange("income")}
        id="formatted-income-input"
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
      />
      <TextField
        className={classes.formControl}
        label="react-number-format"
        value={values.savings}
        onChange={handleChange("savings")}
        id="formatted-savings-input-2"
        InputProps={{
          inputComponent: NumberFormatCustom
        }}
      />
      <MyChart monthlySavings={values.savings} months={12}></MyChart>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        <Input id="component-simple" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          value={name}
          onChange={handleChange}
          aria-describedby="component-helper-text"
        />
        <FormHelperText id="component-helper-text">
          Some important helper text
        </FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} disabled>
        <InputLabel htmlFor="component-disabled">Name</InputLabel>
        <Input id="component-disabled" value={name} onChange={handleChange} />
        <FormHelperText>Disabled</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} error>
        <InputLabel htmlFor="component-error">Name</InputLabel>
        <Input
          id="component-error"
          value={name}
          onChange={handleChange}
          aria-describedby="component-error-text"
        />
        <FormHelperText id="component-error-text">Error</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} variant="outlined">
        <InputLabel ref={labelRef} htmlFor="component-outlined">
          Name
        </InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={name}
          onChange={handleChange}
          labelWidth={labelWidth}
        />
      </FormControl>
      <FormControl className={classes.formControl} variant="filled">
        <InputLabel htmlFor="component-filled">Name</InputLabel>
        <FilledInput
          id="component-filled"
          value={name}
          onChange={handleChange}
        />
      </FormControl>
    </div>
  );
}
