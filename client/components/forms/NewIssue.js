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
  const [projectId, setProjectId] = useState(1);
  const handleOpen = () => {
    open ? setOpen(true) : setOpen(false);
  };
  const { projects } = props;

  const handleChange = e => {
    setProjectId(e.target.value);
    console.log(projectId);
  };

  console.log(props);
  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          variant="filled"
          color="secondary"
          label="Summary"
          autoFocus={true}
          className={classes.selectEmpty}
        ></TextField>
        <Select
          labelId="select-project"
          id="select-project"
          value={projectId}
          onChange={handleChange}
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
        <TextareaAutosize
          rowsMax={4}
          aria-label="desc"
          placeholder="Issue Details"
        />
        <MyButton
          buttonLabel="Test"
          size="medium"
          onClick={() => console.log("testing my button")}
        />
      </FormControl>
    </div>
  );
};

const mapState = state => ({
  projects: state.projects,
});

export default connect(mapState, null)(NewIssue);
