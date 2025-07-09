import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as authlogin } from "../Store/AuthSlice";
import AuthService from "../APPWRITE/Auth.js";
import {Button , Input , Logo} from  "./index"
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";


function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm();
    const [error , setError] = useState("")

    const login = async (data) =>  {
        setError("") 
        console.log("LOGIN FUNCTION CALLED", data);
        try{ 
        const session = await AuthService.login(data)
          if(session){
            const userData = await AuthService.getCurrentUser()
            if(userData) dispatch(authlogin(userData))  ;
            navigate( "/")}
            else {
                console.log("Caught login error:", error);
                setError("Failed to get user data.");
              }
          }
        
        catch(error){
            console.log("Login error object:", error);
            const errorMsg = error.message || error.response?.message || error.response?.errors?.[0]?.message || "An error occurred. Please try again.";
            if (errorMsg.toLowerCase().includes("invalid credentials")) {
              setError("Invalid credentials. Please check the email and password.");
            } else {
              setError(errorMsg);
            }
        }
    }

return (
    <div
    className='flex items-center justify-center w-full'
    >
         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px] text-black pl-8">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                    </p>
                    {typeof error === "string" && error.length > 0 && (
  <p className="text-red-600 mt-8 text-center">{error}</p>
)}
        <form onSubmit={handleSubmit(login)}
        className="mt-8 text-black">
              <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>


        </form>


    </div>
    </div>
)
}




export default Login;