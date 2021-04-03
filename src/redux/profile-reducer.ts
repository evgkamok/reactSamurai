import {ResultCodesEnum, userAPI, userProfile} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";


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
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '' as string | null
}

type InitialStateType = typeof initialState;
type ActionsTypes = AddPostActionType | SetUserProfileActionType | SetUserStatusActionType | DeletePostActionType
  | UploadPhotoSuccessActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const profilePageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
        profile: {...state.profile, photos: action.photoData} as ProfileType
      }
    default:
      return state;
  }
}

type AddPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS
  status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status});

type DeletePostActionType = {
  type: typeof DELETE_POST
  id: number
}
export const deletePost = (id: number): DeletePostActionType => ({type: DELETE_POST, id});

type UploadPhotoSuccessActionType = {
  type: typeof UPLOAD_PHOTO_SUCCESS
  photoData: PhotosType
}
export const uploadPhotoSuccess = (photoData: PhotosType): UploadPhotoSuccessActionType => ({
  type: UPLOAD_PHOTO_SUCCESS,
  photoData
});

export const setUserProfileThunk = (userId: number): ThunkType => async (dispatch) => {
  const userDataProfile = await userAPI.getUserProfile(userId)
  dispatch(setUserProfile(userDataProfile))
}

export const getUserStatusMessage = (userId: number): ThunkType => async (dispatch) => {
  const statusMessage = await userProfile.getStatus(userId)
  dispatch(setUserStatus(statusMessage))
}

export const setUserStatusMessage = (messageStatus: string): ThunkType => async (dispatch) => {
  const response = await userProfile.updateStatus(messageStatus)
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(setUserStatus(messageStatus))
  }
}

export const uploadPhotoFile = (photoFile: any): ThunkType => async (dispatch) => {
  const data = await userProfile.uploadPhoto(photoFile)
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(uploadPhotoSuccess(data.data))
  }
}

export const saveProfileData = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().authorizeUser.userId
  const response = await userProfile.updateProfile(profileData)
  if (response.data.resultCode === ResultCodesEnum.Success && userId !== null) {
    dispatch(setUserProfileThunk(userId))
  } else {
    console.log('Some error')
    // dispatch(stopSubmit('editProfileForm', ({'contacts': {'facebook': response.data.messages[0]}})))
  }
}

export default profilePageReducer;



