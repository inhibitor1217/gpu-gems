import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { reducer as applicationProperty } from './modules/applicationProperty'

const store = configureStore({
  reducer: combineReducers({
    applicationProperty,
  }),
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
