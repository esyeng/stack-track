import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Menu, IssCard } from "./layouts";
import { Grid, Paper, TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchIssues, fetchProjects } from "../store";
import { MyButton } from "./Utils";
import NewIssue from "./forms/NewIssue";

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
    backgroundColor: "#b5deeb",
    opacity: "80%",
  },
  modalPaper: {
    position: "absolute",
    width: 600,
    backgroundColor: "#707070",
    opacity: "95%",
    justifyContent: "center",
    top: "50%",
    left: "50%",
  },
  content: {
    flexDirection: "row",
  },
  textField: {
    width: "88%",
    marginLeft: 220,
    marginRight: 40,
    marginTop: 100,
    marginBottom: 25,
    backgroundColor: "white",
    opacity: "85%",
  },
});

export const submitTicket = () => {
  console.log("submitted!");
};

export const Issue = props => {
  const classes = useStyles();
  const [loading, setloading] = useState(true);
  // Implementation for search filtering in progress
  const [isSearching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [formOpen, setOpen] = useState(false);
  const { issues, user, projects } = props;

  useEffect(() => {
    const { fetchIssues, fetchProjects } = props;
    const waitForData = async () => {
      await fetchIssues();
      await fetchProjects().then(() => {
        setloading(false);
      });
    };
    waitForData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="content">
      <Header style={{ position: "sticky" }} />
      <Menu />

      <Grid container justify="center" spacing={1}>
        <TextField
          id="outlined-full-width"
          label="Search"
          className={classes.textField}
          placeholder="Ticket Number, Desc, etc."
          helperText="Find tickets by filter (feature in progress)"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={evt => setSearchValue(evt.target.value)}
        />

        <Grid container item xs={7}>
          <Grid
            container
            spacing={5}
            direction="column"
            justify="flex-end"
            alignItems="center"
          >
            <MyButton
              buttonLabel="search"
              size="small"
              onClick={() =>
                alert(`alas, you tried to search and nothing came up :(
                here's what you typed: ${searchValue}
                  `)
              }
            />
            <MyButton
              buttonLabel="Create Issue Ticket"
              onClick={() => handleOpen()}
            />
            {formOpen ? (
              <Modal
                style={{ top: "25%", left: "25%" }}
                className={classes.modalPaper}
                open={formOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <NewIssue />
              </Modal>
            ) : null}
            {issues.length
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
                            projectId={item.projectId}
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
    projects: state.projects,
    singleIssueId: state.issueId,
    singleSelected: state.singleSelected,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchIssues: () => dispatch(fetchIssues()),
    fetchProjects: () =>
      dispatch(fetchProjects(`${JSON.parse(localStorage.user).teamId}`)),
  };
};

export default connect(mapState, mapDispatch)(Issue);
