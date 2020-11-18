import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";
import { Link } from "react-router-dom";

const AuthForm = props => {
  const { name, displayName, handleSubmit, error, isLoggedIn } = props;

  console.log(props, isLoggedIn);

  return (
    <div className="auth">
      <div className="btn">
        <Link to="/"> Go Back</Link>
      </div>
      <form onSubmit={handleSubmit} name={name}>
        {displayName === "Sign Up" ? (
          <div className="name">
            <div>
              <label htmlFor="firstName">
                <small className="smallText">First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small className="smallText">Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="username">
                <small className="smallText">username</small>
              </label>
              <input name="username" type="text" />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="information">
          <div>
            <label htmlFor="email">
              <small className="smallText">Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small className="smallText">Password</small>
            </label>
            <input name="password" type="password" />
          </div>
        </div>
        <div className="loginBtnPosition">
          <button className="loginBtn" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div className="googleSignup">
        <button className="googleButton">
          <a className="googleButton" href="/auth/google">
            {displayName} with Google
          </a>
        </button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      if (evt.target.name === "signup") {
        const fName = evt.target.firstName.value;
        const lName = evt.target.lastName.value;
        const formName = evt.target.name;
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        const username = evt.target.username.value;
        dispatch(auth(email, password, formName, fName, lName, username));
      } else if (evt.target.name === "login") {
        const formName = evt.target.name;
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        console.log("logged in");
        dispatch(auth(email, password, formName));
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
