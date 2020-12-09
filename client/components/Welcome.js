import React from "react";
import { Link } from "react-router-dom";
// import Header from "./layouts/Header";
import history from "../history";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "lightgreen",
  },
});

export default function Welcome() {
  const classes = useStyles();
  return (
    <div>
      <section>
        <div className={classes.btnContainer}>
          <Typography variant="h3">Welcome,</Typography>
          <Link to="/login">
            <Button variant="contained" className={classes.loginBtn}>
              Login
            </Button>
          </Link>
          <Typography variant="h3">or</Typography>
          <Link to="/signup">
            <Button variant="contained" className={classes.loginBtn}>
              Sign Up
            </Button>
          </Link>
          <Typography variant="h3">to get started</Typography>
        </div>
      </section>
    </div>
  );
}
