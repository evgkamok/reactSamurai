import {authAPI, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';
const SET_REMEMBER_ME = 'SET_REMEMBER_ME';
const SET_CAPTCHA = 'SET_CAPTCHA';

// type InitialStateType2 = {
//   userId: number | null,
//   email: string | null,
//   login: string | null,
//   isAuthorized: boolean,
//   rememberMe: boolean,
//   captcha: string | null
// }
//

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuthorized: false,
  rememberMe: false,
  captcha: null as string | null
};

type InitialStateType = typeof initialState;

const authorizeUserReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USER_LOGIN_DATA:
      return {
        ...state,
        ...action.payload,
        captcha: null
      }
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.payload
      }
    case SET_REMEMBER_ME:
      return {
        ...state,
        rememberMe: action.payload
      }
    default:
      return state
  }
}

type SetUserLoginDataPayload = {
  userId: number | null
  email: string | null
  login: string | null
  isAuthorized: boolean
}

type SetUserLoginDataActionType = {
  type: typeof SET_USER_LOGIN_DATA
  payload: SetUserLoginDataPayload
}

const setUserLoginData = (userId: number | null, email: string | null, login: string | null, isAuthorized: boolean): SetUserLoginDataActionType => ({
  type: SET_USER_LOGIN_DATA,
  payload: {userId, email, login, isAuthorized},
})

type SetRememberMeActionType = {
  type: typeof SET_REMEMBER_ME
  payload: boolean
}

const setRememberMe = (isRememberMe: boolean): SetRememberMeActionType => ({
  type: SET_REMEMBER_ME,
  payload: isRememberMe
})

type SetCaptchaActionType = {
  type: typeof SET_CAPTCHA
  payload: string
}

const setCaptcha = (captcha: string): SetCaptchaActionType => ({type: SET_CAPTCHA, payload: captcha})

export const getUserLoginData = () => async (dispatch: any) => {
  const response = await authAPI.getUserLoginData();
  if (response.resultCode === 0) {
    const {id, email, login} = response.data
    dispatch(setUserLoginData(id, email, login, true));
  }
}

export const loginUser = (email: string, password: string, isRememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const getCaptcha = async (dispatch: any) => {
  const response = await securityApi.getCaptcha();
  dispatch(setCaptcha(response.data.url))
}

export const logoutUser = () => async (dispatch: any) => {
  const response = await authAPI.logoutUser();
  if (response.data.resultCode === 0) {
    dispatch(setUserLoginData(null, null, null, false));
    dispatch(setRememberMe(false));
  }
}

export default authorizeUserReducer;