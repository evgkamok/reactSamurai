import axios from "axios"
import {PhotosType, ProfileType, UserType} from "../types/types"

const API = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "914bfc52-e116-4bb4-984d-3cf449862e11",
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeCaptcha {
  CaptchaIsRequired = 10
}
type GetUserLoginDataResponseType = {
  data: {id: number, email: string, login: string}
  resultCode: ResultCodesEnum
  messages: Array<string>
}
type LoginLogoutUserResponseType = {
  data: {id: number}
  resultCode: ResultCodesEnum | ResultCodeCaptcha
  messages: Array<string>
}
type GetUsersDataResponseType = {
  items: Array<UserType>
  totalCount: number
  error: string
}
type CommonResponseType = {
  resultCode: number
  messages: Array<string>
  data: any
}
type UploadPhotoResponseType = {
  data: PhotosType
  resultCode: number
  messages: Array<string>
}

export const authAPI = {
  getUserLoginData(){
    return API.get<GetUserLoginDataResponseType>('auth/me').then(response => response.data)
  },

  loginUser(email: string, password: string, rememberMe: boolean = false, captcha: string) {
    return API.post<LoginLogoutUserResponseType>('auth/login', {email, password, rememberMe, captcha})
  },

  logoutUser() {
    return API.delete<LoginLogoutUserResponseType>('auth/login')
  }
}
export const userAPI = {
  getUserProfile(userId: number) {
    return API.get<ProfileType>(`profile/${userId}`).then(response => response.data)
  },

  getUsersData(countUsersOnPage: number, numberPage: number) {
    return API.get<GetUsersDataResponseType>(`users?count=${countUsersOnPage}&page=${numberPage}`).
    then(response => response.data)
  },

  followRequest(userId: number) {
    return API.delete<CommonResponseType>(`follow/${userId}`).then(response => response.data)
  },

  unFollowRequest(userId: number) {
    return API.post<CommonResponseType>(`follow/${userId}`).then(response => response.data)
  },
}
export const userProfile = {
  getStatus(userId: number) {
    return API.get<string>(`profile/status/${userId}`).then(response => response.data)
  },

  updateStatus(status: string) {
    return API.put<CommonResponseType>(`profile/status`, {status})
  },

  updateProfile(profileData: ProfileType) {
    return API.put<CommonResponseType>('profile', profileData)
  },

  uploadPhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return API.put<UploadPhotoResponseType>('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => response.data)
  }
}

export const securityApi = {
  getCaptcha() {
    return API.get<string>(`/security/get-captcha-url`).then(response => response.data)
  }
}
