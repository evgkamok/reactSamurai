import React from 'react'
import {userAPI} from "../api/api";

const SET_NEW_NEWS = 'SET_NEW_NEWS'
const newsText = 'If you want to start measuring performance in your app, pass a function to log results ' +
  '(for example: reportWebVitals(console.log)) or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals'


const initialState = {
  newsList: [
    {id: 1, title: 'First news', text: newsText, author: 'Author'},
    {id: 2, title: 'First news', text: newsText, author: 'Author'},
    {id: 3, title: 'First news', text: newsText, author: 'Author'},
    {id: 4, title: 'First news', text: newsText, author: 'Author'}
  ],
  testProps: null
}

const newsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_NEWS:
      return {
        ...state,
        testProps: action.testProps
      }
    default:
      return {
        ...state
      }
  }
}

export const setNewNewsAC = (testProps) => ({type: SET_NEW_NEWS, testProps: testProps});

export const thunkCreateSetNewNews = (userId, message) => (dispatch) => {
  userAPI.setUserProfile(userId)
    .then(response => {
        console.log(response.data.fullName)
      }
    )
}

export default newsPageReducer;