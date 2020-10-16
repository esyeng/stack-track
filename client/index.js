import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import history from "./history";
// import store from "./store";
import App from "./app";
import { Auth0Provider } from "@auth0/auth0-react";

// import "./socket";

ReactDOM.render(
  <Auth0Provider
    domain="dev-5t8cj8fx.us.auth0.com"
    clientId="EpTrTlNkF86esm2Z1xlEtjWSrT7kulUz"
    redirectUri="http://localhost:3000/home"
  >
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </Auth0Provider>,
  document.getElementById("app")
);
