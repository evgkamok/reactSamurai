import React from 'react';
import {userAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_COUNT_USERS = 'SET_COUNT_USERS';
const SET_FETCHING = 'SET_LOADING_IMG';
const TOGGLE_DISABLE_BUTTON = 'TOGGLE_DISABLE_BUTTON';

const initialState = {
  users:[],
  currentPage: 1,
  countUsers: 0,
  countUsersOnPage: 100,
  isFetching: false,
  disableFollowButtonArray: [],
  fakeValue: 0
};

const usersPageReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: true
            }
          }
          return user
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {
              ...user,
              followed: false
            }
          }
          return user
        })
      }
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNum
      }
    case SET_COUNT_USERS:
      return {
        ...state,
        countUsers: action.countUsers
      }
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case TOGGLE_DISABLE_BUTTON:
      return {
        ...state,
        disableFollowButtonArray:
          action.statusButtonDisable
            ? [...state.disableFollowButtonArray, action.buttonId]
            : state.disableFollowButtonArray.filter( id => id !== action.buttonId)
      }
    default: {
      return state;
    }
  }
}

export const followSuccess = userId => ({type: FOLLOW, userId: userId})
export const unFollowSuccess = userId => ({type: UNFOLLOW, userId: userId})
export const setUsers = (users) => ({type: SET_USERS, users: users})
export const setCurrentPage = (pageNum) => ({type:SET_CURRENT_PAGE, pageNum: pageNum})
export const setCountUsers = (countUsers) => ({type:SET_COUNT_USERS, countUsers: countUsers})
export const setFetching = (isFetching) => ({type:SET_FETCHING, isFetching: isFetching})
export const toggleDisableButton = (statusButtonDisable, buttonId) =>
  ({type:TOGGLE_DISABLE_BUTTON, statusButtonDisable, buttonId})


export const requestUsers = (countUsersOnPage, numberPage) => {
  return (dispatch) => {
    dispatch(setFetching(true));
    userAPI.getUsersData(countUsersOnPage, numberPage)
      .then(response => {
        dispatch(setUsers(response.data.items));
        dispatch(setCurrentPage(numberPage));
        dispatch(setCountUsers(response.data.totalCount));
        dispatch(setFetching(false));
      })
  }
}

export const follow = (userId) => {
  return (dispatch) => {
    dispatch(toggleDisableButton(true, userId));
    userAPI.followRequest(userId)
      .then(response => {
        if (response.resultCode === 0) {
          dispatch(unFollowSuccess(userId));
        }
        dispatch(toggleDisableButton(false, userId));
      })
  }
}

export const unFollow = (userId) => {
  return (dispatch) => {
    dispatch(toggleDisableButton(true, userId));
    userAPI.unFollowRequest(userId)
      .then(response => {
        if (response.resultCode === 0) {
          dispatch(followSuccess(userId));
        }
        dispatch(toggleDisableButton(false, userId));
      })
  }
}

export default usersPageReducer;

