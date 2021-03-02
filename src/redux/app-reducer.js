import {getUserLoginData} from "./authUser-reducer";

const SET_AUTH_INIT_SUCCESS = 'SET_AUTH_INIT_SUCCESS'

const initialState = {
  initSuccess: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_INIT_SUCCESS:
      return {
        ...state,
        initSuccess: true
      }

    default:
      return state
  }
}

const setAuthInitSuccess = () => ({type: SET_AUTH_INIT_SUCCESS})

export const setAuthInitialize = () => (dispatch) => {
  let promise = dispatch(getUserLoginData())
  promise.then(() => {
    dispatch(setAuthInitSuccess());
  })
}

export default appReducer;