import { Provider } from 'react-redux'
import './App.css'
import AppRouter from './AppRouter'
import store from './store/store'
import { ThemeProvider } from './components/themeProvider'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    console.log(import.meta.env);
    console.log(import.meta.env.VITE_API_URL);

  }, []);
  return (
    <ThemeProvider defaultTheme="dark">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  )
}

export default App
