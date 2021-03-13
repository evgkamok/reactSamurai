import {createSelector} from "reselect";

export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}

const getUsersSimple = (state) => {
  return state.usersPage.users
}

export const getUsers = createSelector([getUsersSimple], (users) => {
  return users.filter(item => true)
})

export const getCountUsers = (state) => {
  return state.usersPage.countUsers
}

export const getCountUsersOnPage = (state) => {
  return state.usersPage.countUsersOnPage
}

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}

export const getDisableFollowButtonArray = (state) => {
  return state.usersPage.disableFollowButtonArray
}