import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch,
} from "react-router-dom";
import {
  Auth0Provider,
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import history from "./history";
import UserHome from "./components/user-home";

// import PropTypes from "prop-types";
// import {me} from "./store";

const ProtectedRoute = ({ component, ...args }) => (
  <Route component={withAuthenticationRequired(component)} {...args} />
);

const onRedirectCallback = appState => {
  history.replace(appState?.returnTo || window.location.pathname);
};
export default function App() {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Auth0Provider
      domain="dev-5t8cj8fx.us.auth0.com"
      clientId="EpTrTlNkF86esm2Z1xlEtjWSrT7kulUz"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Router history={history}>
        <Switch>
          <Route exact path="/" />
          <ProtectedRoute path="/home" component={UserHome} />
        </Switch>
      </Router>
    </Auth0Provider>
  );
}
