import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Components/Header.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Page1Data from './Components/Page1Data.jsx'
import Page1 from './Components/Page1.jsx'
import Login from './Components/Login.jsx'
import Page2 from './Components/Page2.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

   <Route path='/' element={<App />}>
      <Route path='' element={<Login/>} />
      <Route path='/home' element={<Page1/>} />
      <Route path='/d/:id' element={<Page1Data/>} />
      <Route path='/genre' element={<Page2/>} />
   </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
   <RouterProvider router={router} />
 </React.StrictMode>,
)

