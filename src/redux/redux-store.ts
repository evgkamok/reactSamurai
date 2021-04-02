import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import appReducer from './app-reducer'
import profilePageReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersPageReducer from "./users-reducer"
import authorizeUserReducer from "./auth-reducer"
import newsPageReducer from "./newsPage-reducer"
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from "redux-form"

const rootReducer = combineReducers({
  app: appReducer,
  authorizeUser: authorizeUserReducer,
  profilePage: profilePageReducer,
  usersPage: usersPageReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  newsPage: newsPageReducer,
  form: formReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
export default store

// @ts-ignore
window.store = store