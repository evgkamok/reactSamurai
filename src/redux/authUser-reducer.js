import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';
const SET_REMEMBER_ME = 'SET_REMEMBER_ME'

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuthorized: false,
  rememberMe: false
};

const authorizeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN_DATA:
      return {
        ...state,
        ...action.dataUserLogin,
      }
    case SET_REMEMBER_ME:
      return {
        ...state,
        rememberMe: action.isRememberMe
      }
    default:
      return state
  }
}

const setUserLoginData = (userId, email, login, isAuthorized) => ({
  type: SET_USER_LOGIN_DATA,
  dataUserLogin: {userId, email, login, isAuthorized},
})
const setRememberMe = (isRememberMe) => ({type: SET_REMEMBER_ME, isRememberMe})


export const getUserLoginData = () => (dispatch) => {
  return authAPI.getUserLoginData()
    .then(response => {
      if (response.resultCode === 0) {
        const {id, email, login} = response.data
        dispatch(setUserLoginData(id, email, login, true));
      }
    })

}


export const loginUser = (email, password, isRememberMe) => (dispatch) => {
  authAPI.loginUser(email, password, isRememberMe)
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(getUserLoginData());
        dispatch(setRememberMe(isRememberMe));
      } else {
        if (response.data.messages.length > 0) {
          dispatch(stopSubmit('login', {_error: response.data.messages[0]}))
        }
      }
    })
}

export const logoutUser = () => (dispatch) => {
  authAPI.logoutUser()
    .then(response => {
      if (response.data.resultCode === 0) {
        dispatch(setUserLoginData(null, null, null, false));
        dispatch(setRememberMe(false));
      }
    })
}


export default authorizeUserReducer;