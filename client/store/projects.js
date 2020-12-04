import axios from "axios";

/**
 * Action Types
 */

const GET_PROJECTS = "GET_PROJECTS";

/**
 * Action Creators
 */

const getProjects = projects => ({
  type: GET_PROJECTS,
  projects,
});

/**
 * Thunk Creators
 */

export const fetchProjects = teamId => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${teamId}`);
    dispatch(getProjects(res.data || null));
  } catch (err) {
    console.error(err);
  }
};

/**
 * Reducer
 */

const defaultState = [];

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return action.projects;
    default:
      return state;
  }
}
