import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const UserHome = props => {
  const { email } = props;

  return (
    <div className="loginPage">
      <div>
        <h3>Welcome, {email}</h3>
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
  };
};

export default connect(mapState)(UserHome);

/**
 * Prop Types
 */

UserHome.propTypes = {
  email: PropTypes.string,
};
