import { Provider } from 'react-redux'
import './App.css'
import AppRouter from './AppRouter'
import store from './store/store'
import { ThemeProvider } from './components/themeProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  )
}

export default App
