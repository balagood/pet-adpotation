import { StrictMode,React} from 'react'
import { createRoot,ReactDOM } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./store/store";
import './index.css'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right"/>
    </Provider>
  </StrictMode>,
)
