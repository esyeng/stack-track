import axios from "axios";
// import passport from "passport";
import history from "../history";

/**
 * Action Types
 */

const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";

/**
 * Action Creators
 */

const getUser = user => ({
  type: GET_USER,
  user,
});

const setUser = user => ({
  type: SET_USER,
  user,
});

const removeUser = user => ({
  type: REMOVE_USER,
});

/**
 * Thunk Creators
 */

export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || null));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (
  email,
  password,
  method,
  fName,
  lName,
  username
) => async dispatch => {
  let res;
  try {
    console.log("AUTHORIZING");
    method === "signup"
      ? (res = await axios.post(`/auth/signup`, {
          fName: fName,
          lName: lName,
          email: email,
          password: password,
          username: username,
        }))
      : (res = await axios.post(`/auth/login`, {
          email: email,
          password: password,
        }));
    localStorage.setItem("user", JSON.stringify(res.data));
    console.log(localStorage);
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/home");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout");
    dispatch(removeUser());
    history.push("/");
  } catch (err) {
    console.error(err);
  }
};

export const setLoggedIn = user => dispatch => {
  dispatch(setUser(user));
};

/**
 * Reducer
 */

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case SET_USER:
      return { state: { user: action.user }, isLoggedIn: true };
    case REMOVE_USER:
      return state;
    default:
      return state;
  }
}
