import React from 'react'
import { useDispatch } from 'react-redux'   
import { logout } from '../Store/AuthSlice'
import AuthService from '../APPWRITE/Auth.js'
import { Button } from './index';

function Logoutbtn() {
const dispatch = useDispatch()
 
const logoutHandler = () => {
    AuthService.logout().then(()=>{
        dispatch(logout())
    })
    .catch(error => console.error(error.message))
}

  return (
   <Button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick = {logoutHandler}>Logout</Button>
  )
}

export default Logoutbtn;