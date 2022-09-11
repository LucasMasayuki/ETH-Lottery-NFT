/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import mintReducer from './mint-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mint: mintReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
