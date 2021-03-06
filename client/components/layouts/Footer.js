import React from "react";
import { Paper, Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "#1f2833",
  },
  text: {
    color: "white",
    fontVariant: "italic",
    paddingLeft: 100,
  },
}));

export default props => {
  const classes = useStyles();
  return (
    <div>
      <Paper className="footer"></Paper>
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography
            variant="h5"
            component="h2"
            className={classes.text}
            gutterBottom
          >
            {"Tracking the stack so your team won't slack :)"}
          </Typography>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1" className={classes.text}>
              @ Emre Yenigun
            </Typography>
          </Container>
        </footer>
      </div>
    </div>
  );
};
