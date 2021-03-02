import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import appReducer from './app-reducer';
import profilePageReducer from './profilePage-reducer';
import dialogsPageReducer from './dialogsPage-reducer';
import sidebarReducer from './sidebar-reducer';
import usersPageReducer from "./usersPage-reducer";
import authorizeUserReducer from "./authUser-reducer";
import newsPageReducer from "./newsPage-reducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer } from "redux-form";

// import { createStore, applyMiddleware, compose } from 'redux';

const reducers = combineReducers({
  app: appReducer,
  profilePage: profilePageReducer,
  dialogsPage: dialogsPageReducer,
  sidebar: sidebarReducer,
  usersPage: usersPageReducer,
  authorizeUser: authorizeUserReducer,
  newsPage: newsPageReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducers, applyMiddleware(thunkMiddleware));
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));



window.store = store;

export default store;
