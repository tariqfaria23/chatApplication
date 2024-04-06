import React, { useContext } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import './style.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import {AuthContext} from './context/AuthContext'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  }
])


const App = () => {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
