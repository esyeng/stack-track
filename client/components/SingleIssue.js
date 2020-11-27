import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Menu } from "./layouts";
import { Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { number } from "prop-types";
// import { fetchSingleIssue } from "../store";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    overflow: "hidden",
  },
  paper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export const SingleIssue = props => {
  // const [single, setSingle] = useState(number);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const filterIssues = () => {
  //     const { issueid } = props.history.match.params;
  //     setSingle(issueid).then(() => {
  //       setLoading(false);
  //     });
  //   };
  //   filterIssues();
  // }, []);

  const { issues, issueid } = props;

  return (
    <div>
      <Header />
      <Menu />
      <Paper>
        <Grid
          container
          spacing={5}
          direction="column"
          justify="flex-end"
          alignItems="center"
        >
          <Grid
            container
            item
            alignContent="center"
            justify="center"
            display="flex"
          >
            {" "}
            {issues.filter(issue => issue.id === issueid)}
            <h3> Biden wins!</h3>
            <Link to="/issues">Back</Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const mapState = state => {
  return {
    user: JSON.parse(localStorage.user),
    issues: state.issues,
  };
};

// const mapDispatch = dispatch => {
//   return {
//     fetchSingleIssue: () =>
//       dispatch(fetchSingleIssue(`${JSON.parse(localStorage.user).teamId}`)),
//   };
// };

export default connect(mapState, null)(SingleIssue);
