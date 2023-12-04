import { Provider } from 'react-redux'
import { AppRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './features'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  )
}

export default App
