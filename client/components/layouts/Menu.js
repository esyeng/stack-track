import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BugReportIcon from "@material-ui/icons/BugReport";
// import StarsIcon from "@material-ui/icons/Stars";
// import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
// import GroupIcon from "@material-ui/icons/Group";
import { Link } from "react-router-dom";

const drawerWidth = 180;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "black",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
    backgroundColor: "grey",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "grey",
    paddingRight: 20,
  },
  // necessary for content to be below app bar
  toolbar: {
    backgroundColor: "white",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link to="/home">
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link to="/issues">
            <ListItem>
              <ListItemIcon>
                <BugReportIcon />
              </ListItemIcon>
              <ListItemText primary="Issues" />
            </ListItem>
          </Link>
          {/* {["Dashboard", "Issues", "My Profile", "Projects", "Team Portal"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <DashboardIcon />
                  ) : index === 1 ? (
                    <BugReportIcon />
                  ) : index === 2 ? (
                    <StarsIcon />
                  ) : index === 3 ? (
                    <DeveloperBoardIcon />
                  ) : (
                    <GroupIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )} */}
        </List>
        <Divider />
      </Drawer>

      <div className={classes.toolbar} />
    </div>
  );
}
