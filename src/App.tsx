import { Provider } from 'react-redux'
import { AppRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './features'
import { Alert } from './features/Toast/Alert'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
        <Alert />
      </Router>
    </Provider>
  )
}

export default App
