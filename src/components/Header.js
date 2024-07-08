import React, { useEffect } from 'react'
import { logo_url } from '../utils/constants'
import { FaCircleUser } from "react-icons/fa6";
import Button from '@mui/joy/Button';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {

  const dispatch= useDispatch();
  const navigate=useNavigate();
  const user = useSelector((store)=>store.user);



  const handleSignOut=()=>{
    // sign Out
    signOut(auth).then(() => {
      // Sign-out successful.    
      // navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  };


  useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid, email, displayName} = user;
        dispatch(addUser({
          uid: uid, 
          email:email, 
          displayName: displayName
        }));
        navigate("/weather");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
       navigate("/");
      }
    });
    // Unsiubscribe when componet is unmounts
        return ()=>unsubscribe();
  },[]);

  return (
    <div className='flex justify-between bg-gradient-to-b from-black z-10 absolute w-screen'>
      <img 
      className='w-12 m-4 '
      src={logo_url} 
      alt="logo" />
      <h1 className='m-4 text-white text-3xl'>Weather Today</h1>

    {user&&(
      <div className='m-4 flex'>
      <FaCircleUser size={40} color='cyan' />
      
      <div className='ml-2 mt-1'>
      <Button 
      onClick={handleSignOut}
      >Sign Out</Button></div>
      </div>
    )}
    </div>
  )
}

export default Header
