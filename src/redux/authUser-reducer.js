import {authAPI, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';
const SET_REMEMBER_ME = 'SET_REMEMBER_ME';
const SET_CAPTCHA = 'SET_CAPTCHA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuthorized: false,
  rememberMe: false,
  captcha: null
};

const authorizeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOGIN_DATA:
      return {
        ...state,
        ...action.dataUserLogin,
        captcha: null
      }
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.captcha
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
const setCaptcha = (captcha) => ({type: SET_CAPTCHA, captcha})

export const getUserLoginData = () => async dispatch => {
  const response = await authAPI.getUserLoginData();
  if (response.resultCode === 0) {
    const {id, email, login} = response.data
    dispatch(setUserLoginData(id, email, login, true));
  }
}

export const loginUser = (email, password, isRememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.loginUser(email, password, isRememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getUserLoginData());
    dispatch(setRememberMe(isRememberMe));
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptcha);
    } else {
      dispatch(stopSubmit('login', {_error: response.data.messages[0]}))
    }
  }
}

export const getCaptcha = async (dispatch) => {
  const response = await securityApi.getCaptcha();
  dispatch(setCaptcha(response.data.url))
}

export const logoutUser = () => async dispatch => {
  const response = await authAPI.logoutUser();
  if (response.data.resultCode === 0) {
    dispatch(setUserLoginData(null, null, null, false));
    dispatch(setRememberMe(false));
  }
}

export default authorizeUserReducer;