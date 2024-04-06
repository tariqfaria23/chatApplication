import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const Home = () => {

  const {currentUser} = useContext(AuthContext)
  const navigate = useNavigate();
  // console.log(currentUser);
  if(!currentUser){
    navigate('/register')
  }

  return (
    <div className="home-container">
      <div className='container'>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home
