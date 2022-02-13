import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {
  TypedUseSelectorHook,
  useSelector as useSelectorBase,
} from 'react-redux'

import { reducer as applicationProperty } from './modules/applicationProperty'

const reducer = combineReducers({
  applicationProperty,
})

type RootState = ReturnType<typeof reducer>

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase

const store = configureStore({
  reducer,
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store
