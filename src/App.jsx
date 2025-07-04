import {useDispatch} from "react-redux"
import { useEffect, useState } from 'react'
import './App.css'
import AuthService from "./APPWRITE/AUTH.JS";
import { login, logout } from "./Store/AuthSlice ";
import { Footer, Header } from "./Componenets";
import { Outlet } from "react-router";

function App() {
const [loading , setloading] = useState(true)
const dispatch = useDispatch();

useEffect(()=>{
  AuthService.getCurrentUser()
             .then((userDATA) => {
              if(userDATA){
                dispatch(login({userDATA}))
              } else{
                dispatch(logout())
                setloading(false);
              }
             } )
             .catch((error) => {throw error , 
              setloading(false)})
             
},[])

if(!loading){
  return (
    <div className = "min-h-screen flex flex-wrap content-between bg-gray-700">
      <div className="w-full block">
    <Header/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
    </div>
    </div>
  )
  
}
else {
  return (
     <h2 className="text-center text-xl font-semibold">Loading...</h2>
  )
}

}
export default App;