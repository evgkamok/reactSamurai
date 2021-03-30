import axios from "axios";

const API = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "914bfc52-e116-4bb4-984d-3cf449862e11",
  }
})

export const authAPI = {
  getUserLoginData() {
    return API.get('auth/me').then(response => response.data)
  },

  loginUser(email, password, rememberMe = false) {
    return API.post('auth/login', {email, password, rememberMe})
  },

  logoutUser() {
    return API.delete('auth/login')
  }
}

export const userAPI = {
  setUserProfile(userId) {
    return API.get(`profile/${userId}`)
  },

  getUsersData(countUsersOnPage, numberPage) {
    return API.get(`users?count=${countUsersOnPage}&page=${numberPage}`)
  },

  followRequest(userId) {
    return API.delete(`follow/${userId}`).then(response => response.data)
  },

  unFollowRequest(userId) {
    return API.post(`follow/${userId}`).then(response => response.data)
  },
}

export const userProfile = {
  getStatus(userId) {
    return API.get(`profile/status/${userId}`)
  },

  updateStatus(status) {
    return API.put(`profile/status`, {status})
  },

  updateProfile(profileData) {
    return API.put('profile', profileData)
  },

  uploadPhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return API.put('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}



