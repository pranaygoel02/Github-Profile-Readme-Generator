import { configureStore } from '@reduxjs/toolkit'
import githubUserReducer from './redux/auth/githubUserSlice'
import readmeReducer from './redux/readmeSlice'

export const store = configureStore({
  reducer: {
    github: githubUserReducer,
    readme: readmeReducer,
  },
})