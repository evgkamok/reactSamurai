import {getUserLoginData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_AUTH_INIT_SUCCESS = 'SET_AUTH_INIT_SUCCESS'

type ActionsTypes = AuthInitSuccessActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

type InitialStateType = {
  initSuccess: boolean
}
const initialState: InitialStateType = {
  initSuccess: false
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_INIT_SUCCESS:
      return {
        ...state,
        initSuccess: true,
      }
    default:
      return state
  }
}

type AuthInitSuccessActionType = {
  type: typeof SET_AUTH_INIT_SUCCESS
}
const setAuthInitSuccess = (): AuthInitSuccessActionType => ({type: SET_AUTH_INIT_SUCCESS})

export const setAuthInitialize = (): ThunkType => async dispatch => {
  await dispatch(getUserLoginData())
  dispatch(setAuthInitSuccess());
}

export default appReducer;