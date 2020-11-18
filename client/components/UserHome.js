import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Footer, Body, Menu } from "./layouts";
import { Box } from "@material-ui/core";
// import Footer from "./layouts/Footer";

export const UserHome = props => {
  const { email } = props;
  const user = JSON.parse(localStorage.user);
  return (
    <div className="loginPage">
      <div>
        <Header></Header>
        <div className="msg">
          <Box textAlign="center">
            <h3>Welcome, {user.fName}</h3>
          </Box>
          <Body></Body>
          <Menu />
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

/**
 * Container
 */

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
  };
};

export default connect(mapState)(UserHome);

/**
 * Prop Types
 */

UserHome.propTypes = {
  email: PropTypes.string,
};
