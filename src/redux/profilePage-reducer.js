import {userAPI, userProfile} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';

const initialState = {
  postsData: [
    {id: 1, message: 'Hello, it is my first post'},
    {id: 2, message: 'Hello, it is my second post'},
    {id: 3, message: 'Hello, it is my third post'}
  ],
  profile: null,
  status: ''
}

const profilePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: 999,
        message: action.newPostText
      }
      return {
        ...state,
        postsData: [...state.postsData, newPost],
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      }
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(item => item.id !== action.id)
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photoData}
      }
    default:
      return state;
  }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const getUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (id) => ({type: DELETE_POST, id});
export const uploadPhotoSuccess = (photoData) => ({type: UPLOAD_PHOTO_SUCCESS, photoData});

export const setUserProfile = (userId) => async dispatch => {
  const response = await userAPI.setUserProfile(userId);
  dispatch(getUserProfile(response.data));
}

export const getUserStatusMessage = (userId) => async dispatch => {
  const response = await userProfile.getStatus(userId);
  dispatch(setUserStatus(response.data))
}

export const setUserStatusMessage = (messageStatus) => async dispatch => {
  const response = await userProfile.updateStatus(messageStatus)
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(messageStatus))
    }
}

export const uploadPhotoFile = (photoFile) => async dispatch => {
  const response = await userProfile.uploadPhoto(photoFile);
  if (response.data.resultCode === 0) {
    dispatch(uploadPhotoSuccess(response.data.data.photos))
  }
}

export const saveProfileData = (profileData) => async (dispatch, getState) => {
  const userId = getState().authorizeUser.userId;
  const response = await userProfile.updateProfile(profileData);
  if (response.data.resultCode === 0) {
    dispatch(setUserProfile(userId))
  } else {
    console.log('Some error');
    dispatch(stopSubmit('editProfileForm', ({'contacts': {'facebook': response.data.messages[0]}})))
  }
}

export default profilePageReducer;



