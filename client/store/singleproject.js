import axios from "axios";

/**
 * Action Types
 */

const GET_PROJECT = "GET_PROJECT";

/**
 * Action Creators
 */

const getSingle = project => ({
  type: GET_PROJECT,
  project,
});

/**
 * Thunk Creators
 */

export const fetchSingleProjectById = projectId => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${projectId}`);
    // console.log(res.data);
    dispatch(getSingle(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * Reducer
 */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_PROJECT:
      return Object.assign(state, action.project);
    default:
      return state;
  }
}
