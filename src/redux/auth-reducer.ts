import {authAPI, ResultCodeCaptcha, ResultCodesEnum, securityApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_LOGIN_DATA = 'SET_USER_LOGIN_DATA';
const SET_REMEMBER_ME = 'SET_REMEMBER_ME';
const SET_CAPTCHA = 'SET_CAPTCHA';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuthorized: false,
  rememberMe: false,
  captcha: null as string | null
};

type InitialStateType = typeof initialState;
type ActionsTypes = SetUserLoginDataActionType | SetRememberMeActionType | SetCaptchaActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const authorizeUserReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
const setUserLoginData = (userId: number | null, email: string | null, login: string | null, isAuthorized: boolean)
  : SetUserLoginDataActionType => ({
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

export const getUserLoginData = (): ThunkType => async (dispatch) => {
  const response = await authAPI.getUserLoginData();
  if (response.resultCode === ResultCodesEnum.Success) {
    const {id, email, login} = response.data
    dispatch(setUserLoginData(id, email, login, true))
  }
}

export const loginUser = (email: string, password: string, isRememberMe: boolean, captcha: string): ThunkType =>
  async (dispatch) => {
    const response = await authAPI.loginUser(email, password, isRememberMe, captcha)
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(getUserLoginData())
      dispatch(setRememberMe(isRememberMe))
    } else {
      if (response.data.resultCode === ResultCodeCaptcha.CaptchaIsRequired) {
        dispatch(getCaptcha)
      } else {
        dispatch(stopSubmit('login', {_error: response.data.messages[0]}))
      }
    }
  }

export const getCaptcha: ThunkType = async (dispatch) => {
  const url = await securityApi.getCaptcha()
  dispatch(setCaptcha(url))
}

export const logoutUser = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logoutUser();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(setUserLoginData(null, null, null, false));
    dispatch(setRememberMe(false));
  }
}

export default authorizeUserReducer;













