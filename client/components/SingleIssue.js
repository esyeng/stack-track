import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Menu } from "./layouts";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchProjects } from "../store";
import { number } from "prop-types";
// import { fetchSingleIssue } from "../store";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingLeft: 120,
    // opacity: "75%",
  },
  paper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  heading: {
    fontFamily: "Arial Black, Gadget, sans-serif",
    fontSize: 36,
    padding: 12,
  },
  subhead: {
    fontFamily: "Arial, Gadget, sans-serif",
    fontSize: 24,
    padding: 12,
  },
  card: {
    width: "100%",
    alignItems: "right",
    backgroundColor: "white",
    justifyContent: "center",
    flexBasis: "40%",
  },
  smalltext: {
    fontFamily: "Arial, Gadget, sans-serif",
    fontSize: 12,
    padding: 8,
  },
  gridBox: {
    overflow: "scroll",
    width: "500px",
    scrollBehavior: "smooth",
    backgroundColor: "white",
  },
});

export const SingleIssue = props => {
  const initialState = {
    single: 0,
    loading: true,
  };
  const classes = useStyles();
  const [single, setSingle] = useState(initialState);
  const [loading, setLoading] = useState(initialState);
  useEffect(() => {
    const { issueid } = props.match.params;
    const idToSet = parseInt(issueid);
    setSingle(idToSet);
    setLoading(false);
    async function syncProject() {
      fetchProjects();
    }
    syncProject();
  }, [setSingle]);
  const { issues } = props;

  console.log(props.projects);
  return (
    <div>
      <Header />
      <Menu />

      <Grid container spacing={5} className={classes.root}>
        <Grid container item className={classes.root}>
          <div>
            {!loading && single > 0 ? (
              issues
                .filter(issue => issue.id === single)
                .map((issue, i) => {
                  console.log(issue);
                  return (
                    <Grid
                      container
                      spacing={4}
                      key={i}
                      className={classes.root}
                    >
                      <Grid container item className="MuiGrid-rootContainer">
                        <Paper className={classes.card}>
                          <Typography className={classes.heading}>
                            Ticket No. {issue.ticketNumber}
                          </Typography>
                          <Typography className={classes.subhead}>
                            Title: {issue.summary}
                          </Typography>
                          <Typography className={classes.subhead}>
                            Status: {issue.status}
                          </Typography>
                          <Typography className={classes.subhead}>
                            Description:
                          </Typography>
                          <Typography className={classes.smalltext}>
                            {issue.description}
                          </Typography>
                          <Paper className={classes.card}>
                            <Typography className={classes.smalltext}>
                              Comments:
                            </Typography>
                            <Grid container item>
                              {issue.comments.length
                                ? issue.comments.map((comment, i) => {
                                    return (
                                      <Paper
                                        className={classes.gridBox}
                                        key={i}
                                      >
                                        <Typography
                                          className={classes.smalltext}
                                        >
                                          {comment.body}
                                        </Typography>
                                      </Paper>
                                    );
                                  })
                                : null}
                            </Grid>
                          </Paper>
                        </Paper>
                      </Grid>
                    </Grid>
                  );
                })
            ) : (
              <div>
                <h2>Sorry, issue not found</h2>
              </div>
            )}
          </div>
          <Link to="/issues">Back</Link>
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = state => {
  return {
    user: JSON.parse(localStorage.user),
    issues: state.issues,
    projects: state.projects,
  };
};

const mapDispatch = dispatch => ({
  fetchProjects: () =>
    dispatch(fetchProjects(`${JSON.parse(localStorage.user).teamId}`)),
});

export default connect(mapState, mapDispatch)(SingleIssue);
