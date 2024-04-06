import React, { useContext, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  const [username,setUsername] = useState('');
  const [user,setUser] = useState(null);
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db,'users'),where('displayName','==',username));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setUser(doc.data())
      });
    }catch(error){
      console.log(error)
    }
  }

  const handleKeyDown = (e) => {
    e.code==='Enter' ? handleSearch():'';
    
  }

  const handleSelect = async() => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        const res = await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "user-chat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "user-chat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch(error){
      console.log(error);
    }

    setUser(null);
    setUsername("");

  }

  return (
    <div className="search-form">
      <div className='search'> 
        <input type="text" placeholder='Find a friend' onKeyDown={handleKeyDown} onChange={(e)=>setUsername(e.target.value)} value={username} />
        {user && <div className="user-chat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user" />
          <div className="user-info">
            <span>{user.displayName}</span>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Search
