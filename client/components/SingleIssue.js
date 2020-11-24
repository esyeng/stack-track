import React from "react";
import { connect } from "react-redux";

export const SingleIssue = props => {
  const { issueId } = props;

  return <div>{issueId} Biden wins!</div>;
};

const mapState = state => {
  return {
    issues: state.issues,
  };
};

export default connect(mapState, null)(SingleIssue);
