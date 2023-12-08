import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import customerReducer from './customers/customerSlice'
import { customerService } from '@/api/customers'
import toastReducer from './Toast/toastSlice'

const reducer = combineReducers({
  customers: customerReducer,
  toast: toastReducer,
  [customerService.reducerPath]: customerService.reducer,
})

export const store = configureStore({
  reducer,
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(customerService.middleware),
})

// hooks
type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
