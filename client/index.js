import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import history from "./history";
// import store from "./store";
import App from "./app";
import { Auth0Provider } from "@auth0/auth0-react";

// import "./socket";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("app")
);
