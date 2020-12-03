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
  content: {
    flexDirection: "row",
  },
  textField: {
    marginLeft: 200,
    marginRight: 10,
    marginTop: 20,
    width: "88%",
    backgroundColor: "white",
    opacity: "85%",
  },
});

export const Issue = props => {
  const classes = useStyles();
  const [loading, setloading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { issues, user } = props;
  let filteredIssues;

  useEffect(() => {
    const { fetchIssues } = props;
    const waitForIssues = async () => {
      await fetchIssues(`${user.teamId}`).then(() => {
        setloading(false);
      });
    };
    const filterIssues = () => {
      issues.length
        ? (filteredIssues = issues.filter(issue => {
            return toString(issue.summary.indexOf(searchValue) !== -1);
          }))
        : null;
      return filteredIssues;
    };
    waitForIssues();
    filterIssues();
    console.log(filteredIssues);
  }, [filteredIssues]);
  console.log(searchValue);

  return (
    <div>
      <Header style={{ position: "sticky" }} />
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
          onChange={evt => setSearchValue(evt.target.value)}
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
            {issues.length
              ? filteredIssues.map((item, idx) => {
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
                            summary={item.summary}
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
  };
};

export default connect(mapState, mapDispatch)(Issue);
