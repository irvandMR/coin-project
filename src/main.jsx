import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './page/coin.jsx'
import {Provider} from "react-redux" 
import store from "./reducer/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CoinPage from './page/coin.jsx'
import CoinDetailPage from './page/coin-detail'

const router = createBrowserRouter([
  {
    path : "/",
    element:  <CoinPage/>
  },
  {
    path: "/:id",
    element: <CoinDetailPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
