import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
}

const getUsersSimple = (state: AppStateType) => {
  return state.usersPage.users;
}

export const getUsers = createSelector([getUsersSimple], (users) => {
  return users.filter(item => true)
})

export const getCountUsers = (state: AppStateType) => {
  return state.usersPage.countUsers;
}

export const getCountUsersOnPage = (state: AppStateType) => {
  return state.usersPage.countUsersOnPage;
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPageNumber;
}

export const getDisableFollowButtonArray = (state: AppStateType) => {
  return state.usersPage.disableFollowButtonArray;
}

export const getSizePartPagination = (state: AppStateType) => {
  return state.usersPage.sizePartPagination;
}