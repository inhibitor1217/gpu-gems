import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'

const store = configureStore({
  reducer: combineReducers({}),
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
