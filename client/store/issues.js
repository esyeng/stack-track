import axios from "axios";
import history from "../history";

/**
 * Action Types
 */

const GET_ISSUES = "GET_ISSUES";

/**
 * Action Creators
 */

const getIssues = issues => ({
  type: GET_ISSUES,
  issues,
});

/**
 * Thunk Creators
 */

export const fetchIssues = () => async dispatch => {
  try {
    const res = await axios.get("/api/issues");
    dispatch(getIssues(res.data || null));
  } catch (err) {
    console.error(err);
  }
};

/**
 * Reducer
 */

const defaultState = {
  issues: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ISSUES:
      return [state, ...action.issues];
    default:
      return state;
  }
}
