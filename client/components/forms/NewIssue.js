import React, { useState, useEffect } from "react";
import { MyButton } from "../Utils";
import {
  makeStyles,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { postNewIssue, fetchIssues } from "../../store";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  formControl: {
    backgroundColor: "#d1d1d1",
    margin: theme.spacing(1),
    minWidth: 120,
    justifyContent: "center",
    flexGrow: 1,
  },
  selectEmpty: {
    margin: theme.spacing(2),
    minWidth: 320,
    maxWidth: 800,
  },
}));

const NewIssue = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [projectId, setProjectId] = useState(1);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [submission, setSubmission] = useState({});

  const { projects } = props;

  const handleSummary = e => {
    setSummary(e.target.value);
    console.log(e.target.value);
  };

  const handleProject = e => {
    setProjectId(e.target.value);
  };

  const handleCategory = e => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleStatus = e => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { postNewIssue } = props;
    const newTicket = {
      summary: summary,
      category: category,
      status: status,
      description: description,
      projectId: projectId,
    };
    setLoading(true);
    try {
      await postNewIssue(newTicket);
      //   setLoading(false);
      const post = async () => {
        await fetchIssues();
        window.location.reload();
      };
      await post();
    } catch (err) {
      console.log(err);
    }
  };
  //   useEffect(() => {
  //     const post = async () => {
  //       setloading(true);
  //     };
  //     loading ? post() : null;
  //   }, []);

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      {loading ? (
        <Typography>...Loading</Typography>
      ) : (
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            onChange={handleSummary}
            name="summary"
            variant="filled"
            value={summary}
            color="secondary"
            label="Summary"
            autoFocus={true}
            className={classes.selectEmpty}
          ></TextField>
          <Select
            className={classes.selectEmpty}
            labelId="select-project"
            name="projectId"
            id="select-project"
            value={projectId}
            onChange={handleProject}
            label="Project"
            color="secondary"
            inputProps={{
              filled: {
                color: "white",
              },
            }}
          >
            <InputLabel>Select Project</InputLabel>
            {projects.projects.length ? (
              projects.projects.map((project, i) => {
                return (
                  <MenuItem key={i} value={project.id}>
                    {project.title}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value={0}>None</MenuItem>
            )}
          </Select>
          <Select
            className={classes.selectEmpty}
            name="category"
            labelId="select-category"
            value={category}
            onChange={handleCategory}
            label="Category"
            color="secondary"
            defaultValue="task"
          >
            <InputLabel>Category</InputLabel>

            <MenuItem value="bug">bug</MenuItem>
            <MenuItem value="task">task</MenuItem>
            <MenuItem value="feature">feature</MenuItem>
            <MenuItem value="report">report</MenuItem>
          </Select>
          <Select
            className={classes.selectEmpty}
            name="status"
            labelId="select-status"
            value={status}
            onChange={handleStatus}
            label="status"
            color="secondary"
            defaultValue="open"
          >
            <InputLabel>Status</InputLabel>

            <MenuItem value="open">open</MenuItem>
            <MenuItem value="in progress">in progress</MenuItem>
            <MenuItem value="closed">closed</MenuItem>
          </Select>
          <TextareaAutosize
            name="description"
            value={description}
            rowsMax={4}
            aria-label="desc"
            placeholder="Issue Details"
            onChange={handleDescription}
          />
          <MyButton buttonLabel="Submit" type="submit" size="medium" />
        </FormControl>
      )}
    </form>
  );
};

const mapState = state => ({
  projects: state.projects,
});

const mapDispatch = dispatch => ({
  postNewIssue: issue => dispatch(postNewIssue(issue)),
  fetchIssues: () =>
    dispatch(fetchIssues(`${JSON.parse(localStorage.user).teamId}`)),
});

export default connect(mapState, mapDispatch)(NewIssue);
