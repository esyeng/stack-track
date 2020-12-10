import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchProjects, fetchIssues } from "../../store";

const useStyles = makeStyles({
  Paper: {
    padding: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridLayout: {
    paddingLeft: 150,
    justifyContent: "center",
  },
  Typography: {
    width: 200,
    // marginRight: 100,
    // paddingLeft: 80,
    textAlign: "center",
    justifyContent: "space-evenly",
  },
});

const Body = props => {
  const [issueFetched, setIssues] = useState(false);
  const [projectFetched, setProjects] = useState(false);
  const [loading, setLoading] = useState(true);
  const { issues, projects, fetchI, fetchP } = props;
  useEffect(() => {
    const fetch = async () => {
      await fetchI();
      setIssues(true);
      await fetchP();
      setProjects(true);
      setLoading(false);
    };
    fetch();
  }, []);

  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.gridLayout}>
      <Grid item sm={5}>
        <Paper className={classes.Paper}>
          {loading ? (
            <Box textAlign="center">
              <Typography variant="h6">Loading..</Typography>
            </Box>
          ) : (
            <Box textAlign="center">
              <Typography variant="h6">Statistics</Typography>
              <Typography paragraph className={classes.Typography}>
                Current Issue Tickets: {issues.length ? `${issues.length}` : 0}
              </Typography>
              <Typography paragraph className={classes.Typography}>
                Open:{" "}
                {issues.length
                  ? `${issues.filter(issue => issue.status === "open").length}`
                  : 0}
              </Typography>
              <Typography paragraph className={classes.Typography}>
                In Progress:{" "}
                {issues.length
                  ? `${
                      issues.filter(issue => issue.status === "in progress")
                        .length
                    }`
                  : 0}
              </Typography>
              <Typography paragraph className={classes.Typography}>
                Completed:{" "}
                {issues.length
                  ? `${
                      issues.filter(issue => issue.status === "closed").length
                    }`
                  : 0}
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
      {loading ? null : (
        <Grid item sm={4}>
          <Paper className={classes.Paper}>
            <Box textAlign="center">
              <Typography variant="h6">Team Profile</Typography>
              <Typography paragraph className={classes.Typography}>
                Team: {projects ? projects.name : ""}
              </Typography>
              <Typography paragraph className={classes.Typography}>
                Active Projects:
                {projects
                  ? projects.projects
                    ? projects.projects.length
                    : 0
                  : 0}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

const mapState = state => ({
  projects: state.projects,
  issues: state.issues,
});

const mapDispatch = dispatch => ({
  fetchI: async () => dispatch(fetchIssues()),
  fetchP: async () =>
    dispatch(fetchProjects(`${JSON.parse(localStorage.user).teamId}`)),
});

export default connect(mapState, mapDispatch)(Body);
