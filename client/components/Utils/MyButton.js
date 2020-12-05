import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
/**
 * This component will act as a reusable multipurpose button, its function
 * passed by props. Etc. Link to {destination} onSubmit {props.submitForm}
 */

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(1),
  },
  buttonProps: {
    label: {
      font: "Roboto sans serif",
    },
    containedPrimary: {
      color: "#03e8fc",
    },
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MyButton = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.buttonProps}
      >
        {props.buttonLabel || null}
      </Button>
    </div>
  );
};

export default MyButton;
