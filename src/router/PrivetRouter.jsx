import React, { useContext } from 'react'
import { AuthContext } from './../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRouter = ({children}) => {

    const {user,loading} = useContext(AuthContext);
    const location = useLocation()

    if(user){
        return children
    }

    if(loading){
        return <div className='flex justify-center h-screen'>
            <span className='loading loading-infinity loading-lg '></span>
        </div>
    }

  return <Navigate state={location.pathname} to='/logIn' ></Navigate>
}

export default PrivetRouter