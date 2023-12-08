import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '..'

export const toaster = createSelector(
  (state: RootState): RootState['toast'] => state.toast,
  (toast) => toast
)
