import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type InitialState } from './types'

const initialState: InitialState = {
  isVisible: false,
  message: '',
  severity: 'error',
}
const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    hideToast(state) {
      state.isVisible = false
    },
    setToastMessage: (
      state,
      {
        payload,
      }: PayloadAction<{ message: string; severity?: 'error' | 'success' }>
    ) => {
      state.isVisible = true
      state.message = payload.message
      state.severity = payload.severity
    },
    clearToastMessage: (state) => {
      state.isVisible = false
      state.message = ''
      state.severity = 'error'
    },
  },
})

export const { hideToast, clearToastMessage, setToastMessage } =
  toastSlice.actions
export default toastSlice.reducer
