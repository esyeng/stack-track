import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MuiDialog, TextField } from "@material-ui/core";
import { MyButton } from "./index";

const useStyles = makeStyles(theme => ({
  root: {
    //
  },
}));

export default props => {
  const classes = useStyles();

  return (
    <div>
      <MuiDialog>
        <TextField></TextField>
      </MuiDialog>
    </div>
  );
};
