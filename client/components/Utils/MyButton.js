import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
/**
 * This component will act as a reusable multipurpose button, its function
 * passed by props. Etc. Link to {destination} onSubmit {props.submitForm}
 */

const useStyles = makeStyles(theme => ({
  buttonProps: {
    label: {
      font: "Roboto sans serif",
    },
    containedPrimary: {
      color: "#03e8fc",
    },
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MyButton = props => {
  // const { passedFunc } = props;

  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      size={props.size}
      className={classes.buttonProps}
      onClick={props.onClick}
    >
      {props.buttonLabel || null}
    </Button>
  );
};

export default MyButton;
