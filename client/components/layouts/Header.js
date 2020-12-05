import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Fragment } from "@material-ui/core";
import { logout } from "../../store";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 38,
  },
  menuButton: {
    marginRight: theme.spacing(22),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 160,
  },
}));

const showAlert = () => {
  return alert("clicked the burger");
};

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="transparent" className={classes.root}>
      <Toolbar style={{ backgroundColor: "#97aabd" }}>
        <Link to="/home">
          <img
            src={
              "https://drive.google.com/uc?export=download&id=1KSZ2-FhqzwuKfDsFumDR1kL5MR3l6EJX"
            }
            alt="logo"
            height="60px"
            width="400px"
            className={classes.logo}
          />
        </Link>
        <Typography
          style={{ color: "red", fontStyle: "italic" }}
          variant="h6"
          className={classes.title}
        ></Typography>

        <Link to="/">
          <Button style={{ color: "black" }} className="logout" color="inherit">
            Logout
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const mapDispatch = dispatch => {
  return {
    handleSumbit(evt) {
      evt.preventDefault();
      if (evt.target.name === "logout") {
        dispatch(logout());
        localStorage.clear();
      }
    },
  };
};

export default connect(null, mapDispatch)(Header);
