import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import history from "./history";
// import PropTypes from "prop-types";
// import {me} from "./store";

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = appState => {
  history.replace(appState?.returnTo || window.location.pathname);
};

export const Routes = () => {
  return (
    <div>
      <Route path="/home" component={UserHome} />
    </div>
  );
};

/*
<Auth0Provider
    domain="dev-5t8cj8fx.us.auth0.com"
    clientId="EpTrTlNkF86esm2Z1xlEtjWSrT7kulUz"
    redirectUri="http://localhost:3000/home"
  >

  </Auth0Provider>
*/
