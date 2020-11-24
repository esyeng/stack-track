import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Login,
  Signup,
  UserHome,
  Welcome,
  Issue,
  Project,
} from "./components/index";
import { me } from "./store";
import { SingleIssue } from "./components/SingleIssue";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.isLoggedIn
      ? this.props.loadInitialData()
      : console.log("going to login");
  }

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        {localStorage.user && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/issues" component={Issue} />
            <Route exact path="/ticket" component={SingleIssue} />
            <Route exact path="/projects" component={Project} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      // console.log("load initial data called");
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
