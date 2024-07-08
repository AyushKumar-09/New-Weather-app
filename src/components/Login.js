import React, { useRef, useState } from 'react';
import Header from "./Header";
import Button from '@mui/joy/Button';
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch=useDispatch();


    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // validate 
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        // sign in/up
        if (!isSignInForm) {
            //sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                      }).then(() => {
                        const {uid, email, displayName} = auth.currentUser;
                        dispatch(addUser({
                          uid: uid, 
                          email:email, 
                          displayName: displayName
                        }));
                        // Profile updated!
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        // ...
                      });
                    console.log(user);
                    // navigate("/weather");

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });

        }
        else {
            // sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // console.log(user);
                    // navigate("/weather");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });

        }


    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <>
            <div>
                <Header />
                <div className='absolute'>
                    <img
                        className=''
                        src="https://wallpapers.com/images/hd/1920x1080-full-hd-nature-landscape-54q8pleyp8lhhbu7.jpg" alt="bg img" />
                </div>

                <form
                    onSubmit={(e) => { e.preventDefault() }}
                    className='absolute bg-black w-3/12 my-36 mx-auto right-0 left-0 p-12 text-white bg-opacity-60'>

                    <h1 className='font-bold text-3xl py-4'> {isSignInForm ? "Sign In" : "Sign Up "}</h1>


                    {/* name */}
                    {!isSignInForm &&
                        <input
                        ref={name}
                            type="text"
                            placeholder='Full Name'
                            className='p-2 my-4  w-full rounded-lg text-black' />}

                    {/* email */}
                    <input
                        ref={email}
                        type="text"
                        placeholder='Email Address'
                        className='p-2 my-4 w-full rounded-lg text-black' />

                    {/* password  */}
                    <input
                        ref={password}
                        type="password"
                        placeholder='password'
                        className='p-2 my-4  w-full rounded-lg  text-black' />

                    {/* error message */}
                    <p className='text-red-600 font-bold py-2 '>{errorMessage}</p>




                    <Button
                        className='w-full'
                        onClick={handleButtonClick}
                    >{isSignInForm ? "Sign In" : "Sign Up "}</Button>

                    <p className='py-6 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New To Weather Today? Sign Up Now" : "Already a user Sign In Now"}  </p>

                </form>


            </div>

        </>
    )
}

export default Login
