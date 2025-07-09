import {useDispatch} from "react-redux"
import { useEffect, useState } from 'react';
import './App.css';
import { login, logout } from "./Store/AuthSlice";
import { Footer, Header } from "./Components";
import { Outlet } from "react-router-dom";
import AuthService from "./APPWRITE/AUTH.JS";

function App() {
const [loading , setloading] = useState(true)
const dispatch = useDispatch();

useEffect(()=>{
  AuthService.getCurrentUser()
             .then((userDATA) => {
              if(userDATA){
                dispatch(login(userDATA))
              } else{
                dispatch(logout())
                
              }
             } )
             .catch((error) => {throw error 
              })
              .finally(() => {
                setloading(false);
              });
             
},[])

if(!loading){
  return (
    <div className="min-h-screen flex flex-col bg-gray-700">
      <Header/>
      <main className="flex-1">
        <Outlet/>
      </main>
      <Footer/>
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