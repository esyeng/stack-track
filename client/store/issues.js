import axios from "axios";
import history from "../history";

/**
 * Action Types
 */

const GET_ISSUES = "GET_ISSUES";
const SET_SINGLE_ISSUE = "SET_SINGLE_ISSUE";
const SELECT_ISSUE = "SELECT_ISSUE";

/**
 * Action Creators
 */

const getIssues = issues => ({
  type: GET_ISSUES,
  issues,
});

const setIssue = id => ({
  type: SET_SINGLE_ISSUE,
  id,
});

const selectIssue = () => ({
  type: SELECT_ISSUE,
});

/**
 * Thunk Creators
 */

export const fetchIssues = teamId => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${teamId}`);
    const issuesFromTeamProjects = [
      res.data.projects.map(project => {
        return project.issues;
      }),
    ];

    const nestedIssues = issuesFromTeamProjects.flat();
    const results = nestedIssues.flat();
    dispatch(getIssues(results));
  } catch (err) {
    console.error(err);
  }
};

export const setSingleIssueCard = id => dispatch => {
  dispatch(setIssue(id));
};

export const selectSingleIssueCard = () => dispatch => {
  dispatch(selectIssue());
};

/**
 * Reducer
 */

const defaultState = {
  issues: [],
  singleSelected: false,
  singleIssueId: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_ISSUES:
      return [state, ...action.issues];
    case SET_SINGLE_ISSUE:
      return { singleIssueId: action.id };
    case SELECT_ISSUE:
      return singleSelected
        ? { singleSelected: false }
        : { singleSelected: true };
    default:
      return state;
  }
}
