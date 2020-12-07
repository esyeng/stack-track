import axios from "axios";
import history from "../history";

/**
 * Action Types
 */

const GET_ISSUES = "GET_ISSUES";
const SET_SINGLE_ISSUE = "SET_SINGLE_ISSUE";
const SELECT_ISSUE = "SELECT_ISSUE";
const CREATE_ISSUE = "CREATE_ISSUE";
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

const createIssue = issue => ({
  type: CREATE_ISSUE,
  issue,
});
/**
 * Thunk Creators
 */

export const fetchIssues = () => async dispatch => {
  try {
    const res = await axios.get(`/api/issues`);
    // const issuesFromTeamProjects = [
    //   res.data.projects.map(project => {
    //     return project.issues;
    //   }),
    // ];

    // const nestedIssues = issuesFromTeamProjects.flat();
    // const results = nestedIssues.flat();
    const results = res.data;
    dispatch(getIssues(results));
  } catch (err) {
    console.error(err);
  }
};

export const postNewIssue = issueData => async dispatch => {
  try {
    const { summary, category, status, description, projectId } = issueData;
    const res = await axios.post(`/api/issues/`, {
      summary: summary,
      category: category,
      status: status,
      description: description,
      projectId: projectId,
    });
    dispatch(createIssue(res.data));
  } catch (err) {}
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
    case CREATE_ISSUE:
      return action.issue;
    default:
      return state;
  }
}
