import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import appReducer from './app-reducer';
import profilePageReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersPageReducer from "./users-reducer";
import authorizeUserReducer from "./auth-reducer";
import newsPageReducer from "./newsPage-reducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from "redux-form";

const reducers = combineReducers({
  app: appReducer,
  profilePage: profilePageReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersPageReducer,
  authorizeUser: authorizeUserReducer,
  newsPage: newsPageReducer,
  form: formReducer
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;

window.store = store;