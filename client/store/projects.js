import axios from "axios";

/**
 * Action Types
 */

const GET_PROJECTS = "GET_PROJECTS";
const CHECK_TITLE = "CHECK_TITLE";

/**
 * Action Creators
 */

const getProjects = projects => ({
  type: GET_PROJECTS,
  projects,
});

export const checkTitle = id => ({
  type: CHECK_TITLE,
  id,
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

// export const fetchSingleProjectById = projectId => async dispatch => {
//   try {
//     const res = await axios.get(`/api/projects/i/${projectId}`);
//     dispatch(getSingleProject(res.data || null));
//   } catch (err) {
//     console.error(err);
//   }
// };

/**
 * Reducer
 */

const defaultState = {
  projects: [],
  project: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return action.projects;
    default:
      return state;
  }
}
