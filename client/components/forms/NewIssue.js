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
} from "@material-ui/core";
import { connect } from "react-redux";

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
  const [summary, setSummary] = useState("");
  const [projectId, setProjectId] = useState(1);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  //   const handleOpen = () => {
  //     open ? setOpen(true) : setOpen(false);
  //   };

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

  const handleSubmit = e => {
    e.preventDefault();
    //   createTicket()
    const newTicket = {
      summary: summary,
      category: category,
      status: status,
      description: description,
      projectId: projectId,
    };
    console.log(newTicket);
  };

  console.log(props);
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          onInput={e => handleSummary(e)}
          name="summary"
          variant="filled"
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
          rowsMax={4}
          aria-label="desc"
          placeholder="Issue Details"
          onInput={e => handleDescription(e)}
        />
        <MyButton buttonLabel="Submit" type="submit" size="medium" />
      </FormControl>
    </form>
  );
};

const mapState = state => ({
  projects: state.projects,
});

export default connect(mapState, null)(NewIssue);
