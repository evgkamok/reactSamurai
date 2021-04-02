import {userAPI} from "../api/api";
import { UserType } from "../types/types";

import {updateObjectInArray} from "../utils/objectHelpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_COUNT_USERS = 'SET_COUNT_USERS';
const SET_FETCHING = 'SET_LOADING_IMG';
const TOGGLE_DISABLE_BUTTON = 'TOGGLE_DISABLE_BUTTON';


const initialState = {
  users: [] as Array<UserType>,
  currentPageNumber: 1,
  countUsers: 0,
  countUsersOnPage: 100,
  sizePartPagination: 10,
  isFetching: false,
  disableFollowButtonArray: [] as Array<number>,
}

type InitialStateType = typeof initialState

const usersPageReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, 'id', action.userId, {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, 'id', action.userId, {followed: false})
      }
    case SET_USERS:
      return {...state, users: action.users,}
    case SET_CURRENT_PAGE:
      return {...state, currentPageNumber: action.pageNum}
    case SET_COUNT_USERS:
      return {...state, countUsers: action.countUsers}
    case SET_FETCHING:
      return {...state, isFetching: action.isFetching}
    case TOGGLE_DISABLE_BUTTON:
      return {
        ...state,
        disableFollowButtonArray:
          action.statusButtonDisable
            ? [...state.disableFollowButtonArray, action.buttonId]
            : state.disableFollowButtonArray.filter(id => id !== action.buttonId)
      }
    default: {
      return state;
    }
  }
}

type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})

type UnFollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unFollowSuccess = (userId: number): UnFollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  pageNum: number
}
export const setCurrentPage = (pageNum: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, pageNum})

type SetCountUsersActionType = {
  type: typeof SET_COUNT_USERS
  countUsers: number
}
export const setCountUsers = (countUsers: number): SetCountUsersActionType => ({type: SET_COUNT_USERS, countUsers})

type SetFetchingActionType = {
  type: typeof SET_FETCHING
  isFetching: boolean
}
export const setFetching = (isFetching: boolean): SetFetchingActionType => ({type: SET_FETCHING, isFetching})

type ToggleDisableButtonActionType = {
  type: typeof TOGGLE_DISABLE_BUTTON
  statusButtonDisable: boolean
  buttonId: number
}
export const toggleDisableButton = (statusButtonDisable: boolean, buttonId: number): ToggleDisableButtonActionType =>
  ({type: TOGGLE_DISABLE_BUTTON, statusButtonDisable, buttonId})


export const requestUsers = (countUsersOnPage: number, numberPage: number) => {
  return async (dispatch: any) => {
    dispatch(setFetching(true));
    const response = await userAPI.getUsersData(countUsersOnPage, numberPage)
    dispatch(setUsers(response.data.items));
    dispatch(setCurrentPage(numberPage));
    dispatch(setCountUsers(response.data.totalCount));
    dispatch(setFetching(false));
  }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(toggleDisableButton(true, userId));
  const response = await apiMethod(userId)
  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleDisableButton(false, userId));
}

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, userAPI.followRequest, unFollowSuccess);
  }
}

export const unFollow = (userId: number) => {
  return async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, userAPI.unFollowRequest, followSuccess);
  }
}

export default usersPageReducer;

