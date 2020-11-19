import React from "react";
import { Paper, Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";

export default props => {
  return (
    <Paper className="footer">
      <Tabs
        className="footer"
        value={0}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
    </Paper>
  );
};
