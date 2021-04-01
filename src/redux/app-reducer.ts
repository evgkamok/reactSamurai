import {getUserLoginData} from "./auth-reducer";

const SET_AUTH_INIT_SUCCESS = 'SET_AUTH_INIT_SUCCESS'

type InitialStateType = {
  initSuccess: boolean
}

const initialState: InitialStateType = {
  initSuccess: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const setAuthInitialize = () => async (dispatch: any) => {
  await dispatch(getUserLoginData())
  dispatch(setAuthInitSuccess());
}

export default appReducer;