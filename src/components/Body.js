import React from 'react'
import {createBrowserRouter}from "react-router-dom";
import Login from './Login'
import Weather from './Weather'
import { RouterProvider } from 'react-router-dom';

import {useDispatch} from "react-redux";


const Body = () => {

  const dispatch = useDispatch();


    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Login/>
        },
        {
            path:"/weather",
            element: <Weather/>
        },
    ]);


   

  return (
    <>
    <div>
   <RouterProvider router={appRouter}/>
   </div>
    </>
  )
}

export default Body
