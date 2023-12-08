export type InitialState = {
  isVisible: boolean
  message: string
  severity?: 'error' | 'success'
}

export type ToastArgs = {
  severity: 'error' | 'success'
  message: string
  timeout?: number
}
