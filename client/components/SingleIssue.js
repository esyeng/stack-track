import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Menu } from "./layouts";
import {
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  TextareaAutosize,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { fetchProjects, fetchIssues, updateSelectedIssue } from "../store";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: 120,
    paddingTop: 70,
  },
  paper: {
    flexDirection: "row",
    flex: 1,
    opacity: "80%",
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    marginRight: 80,
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
  smalltext: {
    fontFamily: "Arial, Gadget, sans-serif",
    fontSize: 16,
    padding: 8,
  },
  gridBox: {
    // overflow: "scroll",
    width: "500px",
    // scrollBehavior: "smooth",
    justifyContent: "center",
  },
  button: {
    borderWidth: "4px",
    borderColor: "black",
    width: "175px",
    height: "min-content",
    backgroundColor: "white",
    borderColor: "solid 1 px",
  },
  formInput: {
    width: "500px",
  },
  commentSection: {
    backgroundColor: "cyan",
    overflow: "scroll",
    width: "500px",
    // scrollBehavior: "smooth",
    justifyContent: "center",
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
  const [editing, setEditing] = useState(false);
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [save, setSave] = useState(false);
  const [post, setPost] = useState(false);
  const [form, setForm] = useState({});
  const { fetchIssues } = props;

  const toggleForm = () => {
    editing ? setEditing(false) : setEditing(true);
  };

  const toggleSave = async () => {
    // save ? setSave(false) : setSave(true);
    try {
      const { updateIssue } = props;
      const updates = {
        id: props.match.params.issueid,
        status: status,
        summary: summary,
        description: description,
      };
      console.log("Saving...", updates);
      setLoading(true);
      await updateIssue(updates);
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const sendPost = () => {
    !post ? setPost(true) : setPost(false);
    // postUpdate()
  };

  const postComment = () => {
    // dispatch comment action..
    console.log(JSON.parse(localStorage.user));
    console.log(`${JSON.parse(localStorage.user).fName} wrote:  `, comment);
  };

  useEffect(() => {
    const { issueid } = props.match.params;
    const idToSet = parseInt(issueid);
    setSingle(idToSet);
    async function syncProject() {
      fetchProjects();
      fetchIssues();
      setLoading(false);
    }
    syncProject();
  }, []);
  const { issues } = props;
  return (
    <div className="content">
      <Header />
      <Menu />

      <Grid container spacing={5} className={classes.root}>
        <Grid container item className={classes.root}>
          <Link to="/issues">
            <Button className={classes.button} size="medium">
              Back to Issues
            </Button>
          </Link>
          <Link to="/projects">
            <Button className={classes.button} size="medium">
              Project board
            </Button>
          </Link>
          <div>
            {loading ? (
              <Typography
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                ...Loading..
              </Typography>
            ) : !loading && single > 0 ? (
              issues.length ? (
                issues
                  .filter(issue => issue.id === single)
                  .map((issue, i) => {
                    return (
                      <Grid
                        container
                        spacing={4}
                        key={i}
                        className={classes.root}
                      >
                        <Grid container item className="MuiGrid-rootContainer">
                          <Paper className={classes.paper}>
                            <Button
                              className={classes.button}
                              size="medium"
                              onClick={() => toggleForm()}
                            >
                              {editing ? `Cancel` : `Edit`}
                            </Button>
                            <Button
                              className={classes.button}
                              size="medium"
                              onClick={() => toggleSave()}
                            >
                              Save
                            </Button>
                            <Button className={classes.button} size="medium">
                              Mark as resolved
                            </Button>
                            <Typography className={classes.heading}>
                              Ticket No. {issue.ticketNumber}
                            </Typography>
                            {editing ? (
                              <FormControl
                                htmlFor="summaryForm"
                                className={classes.formInput}
                              >
                                <InputLabel>Title:</InputLabel>
                                <OutlinedInput
                                  name="summaryForm"
                                  value={summary}
                                  onChange={e => setSummary(e.target.value)}
                                ></OutlinedInput>
                              </FormControl>
                            ) : (
                              <Typography className={classes.subhead}>
                                Title: {issue.summary}
                              </Typography>
                            )}
                            {editing ? (
                              <FormControl
                                htmlFor="statusForm"
                                className={classes.formInput}
                              >
                                <InputLabel>Status:</InputLabel>
                                <Select
                                  name="statusForm"
                                  value={status}
                                  onChange={e => setStatus(e.target.value)}
                                >
                                  <MenuItem value="in progress">
                                    in progress
                                  </MenuItem>
                                  <MenuItem value="open">open</MenuItem>
                                  <MenuItem value="closed">closed</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <Typography className={classes.subhead}>
                                Status: {issue.status}
                              </Typography>
                            )}
                            <Typography className={classes.subhead}>
                              Description:
                            </Typography>
                            {editing ? (
                              <FormControl
                                htmlFor="descriptionForm"
                                className={classes.formInput}
                              >
                                <TextareaAutosize
                                  name="description"
                                  value={description}
                                  onChange={e => setDescription(e.target.value)}
                                ></TextareaAutosize>
                              </FormControl>
                            ) : (
                              <Typography className={classes.smalltext}>
                                {issue.description}
                              </Typography>
                            )}
                            <Paper className={classes.paper}>
                              <Typography className={classes.smalltext}>
                                Comments:
                              </Typography>
                              <Grid container item>
                                <FormControl
                                  htmlFor="comment"
                                  className={classes.formInput}
                                >
                                  <InputLabel>Comment on this issue</InputLabel>
                                  <OutlinedInput
                                    name="commentLine"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                  ></OutlinedInput>
                                </FormControl>
                                <Button
                                  className={classes.button}
                                  size="small"
                                  onClick={() => postComment()}
                                >
                                  Post
                                </Button>

                                {issue.comments.length
                                  ? issue.comments.map((comment, i) => {
                                      return (
                                        <Paper
                                          className={classes.commentSection}
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
                <Typography
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  ...Loading..
                </Typography>
              )
            ) : (
              <div>
                <h2>Sorry, issue not found</h2>
              </div>
            )}
          </div>
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
  fetchIssues: () => dispatch(fetchIssues()),
  updateIssue: issue => dispatch(updateSelectedIssue(issue)),
});

export default connect(mapState, mapDispatch)(SingleIssue);
