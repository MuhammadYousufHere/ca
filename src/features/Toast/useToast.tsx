import { useCallback } from 'react'
import { useAppDispatch } from '..'
import { ToastArgs } from './types'
import { clearToastMessage, setToastMessage } from './toastSlice'

export default function useToast() {
  const dispatch = useAppDispatch()

  const addAutoDismissToast = useCallback(
    ({ message, timeout = 2500, severity = 'success' }: ToastArgs) => {
      dispatch(setToastMessage({ message, severity }))

      setTimeout(() => {
        dispatch(clearToastMessage())
      }, timeout)
    },
    [dispatch]
  )
  return {
    addAutoDismissToast,
  }
}
