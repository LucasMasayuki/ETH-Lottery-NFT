/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export type MintState = {
  errorMessage: string
  isMinting: boolean
  soldOut: boolean
}

const initialState: MintState = {
  errorMessage: '',
  isMinting: false,
  soldOut: false,
}

export const mintSlice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload
    },
    setIsMinting: (state, { payload }) => {
      state.isMinting = payload
    },
    setSoldOut: (state, { payload }) => {
      state.soldOut = payload
    },
  },
})

export const {  setErrorMessage, setIsMinting, setSoldOut } = mintSlice.actions

export const selectMint = (state: RootState): MintState =>
  state.mint

export default mintSlice.reducer
