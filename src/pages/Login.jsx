import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">whip chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='e-mail'/>
          <input type="password" placeholder='password' />
          <button type="submit">Sign In</button>
        </form>
        <p className='text'>Don't have an account? <Link to='/register'>Register</Link> </p>
      </div>
    </div>
  )
}

export default Login 
