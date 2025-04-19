import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducer';
import axiosInstance from '@/shared/api';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: axiosInstance
      }
    }),
  })


export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
