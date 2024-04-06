import React from 'react'
import { FaImage, FaPlus } from "react-icons/fa"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom'; 

const Register = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    
    try {
      const res = await createUserWithEmailAndPassword(auth,email,password)
      // console.log(res);

const storageRef = ref(storage, name);

const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observer
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile (res.user,{
            displayName:name,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName:name,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "user-chat", res.user.uid),{

          })
          navigate('/');
          

        });
      }
    );
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">whip chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='e-mail'/>
          <input type="password" placeholder='password' />
          <input style={{display:'none'}} type="file" id='avatar'/>
          <label htmlFor="avatar">
            <div className='avatar-image'>
              <FaImage className='image'/>
              <FaPlus className='plus'/>
            </div>
            <p>Add an avatar</p>
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p className='text'>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register
