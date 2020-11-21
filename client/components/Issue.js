import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Menu, IssCard } from "./layouts";
import { Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchIssues } from "../store";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  paper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  control: {},
  content: {
    flexDirection: "row",
  },
  textField: {
    marginLeft: 200,
    marginRight: 10,
    marginTop: 15,
    backgroundColor: "white",
    opacity: "85%",
  },
});

export const Issue = props => {
  const classes = useStyles();
  const [singleIssueCard, setSingleIssue] = useState(null);
  const [loading, setloading] = useState(true);
  const { issues, user, singleIssueId, singleSelected } = props;
  // console.log(props);

  useEffect(() => {
    const { fetchIssues } = props;
    fetchIssues(`${user.teamId}`).then(() => {
      setloading(false);
    });
  }, []);

  let issueToSet;
  console.log(props);
  return (
    <div>
      <Header />
      <Menu />
      <form noValidate autoComplete="off">
        <TextField
          id="outlined-full-width"
          label="Search"
          className={classes.textField}
          placeholder="Ticket Number, Desc, etc."
          helperText="Find tickets by filter"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </form>
      <Grid container justify="center" spacing={1}>
        <Grid container item xs={7}>
          <Grid
            container
            spacing={5}
            direction="column"
            justify="flex-end"
            alignItems="center"
          >
            {issues.length && singleSelected
              ? ((issueToSet = issues.filter(issue => {
                  return singleIssueId === issue.id;
                })),
                setSingleIssue(issueToSet[0]),
                (
                  <Grid
                    container
                    item
                    alignContent="center"
                    justify="center"
                    display="flex"
                  >
                    <Paper className={classes.paper}>
                      <IssCard
                        issueId={singleIssueCard.id}
                        ticketNumber={singleIssueCard.ticketNumber}
                        description={singleIssueCard.description}
                        category={singleIssueCard.category}
                        status={singleIssueId.status}
                      ></IssCard>
                    </Paper>
                  </Grid>
                ))
              : issues.length && !singleSelected
              ? issues.map((item, idx) => {
                  if (idx === 0) {
                    return null;
                  } else
                    return (
                      <Grid
                        key={idx}
                        container
                        item
                        alignContent="center"
                        justify="center"
                        display="flex"
                      >
                        <Paper className={classes.paper}>
                          <IssCard
                            issueId={item.id}
                            ticketNumber={item.ticketNumber}
                            description={item.description}
                            category={item.category}
                            status={item.status}
                          ></IssCard>
                        </Paper>
                      </Grid>
                    );
                })
              : null}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = state => {
  return {
    user: JSON.parse(localStorage.user),
    issues: state.issues,
    singleIssueId: state.issueId,
    singleSelected: state.singleSelected,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchIssues: () =>
      dispatch(fetchIssues(`${JSON.parse(localStorage.user).teamId}`)),
    // selectIssue: id => dispatch(selectIssue(id)),
  };
};

export default connect(mapState, mapDispatch)(Issue);
