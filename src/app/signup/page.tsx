"use client";
import Link from "next/link";
import React, { useState} from "react";
import { useRouter } from "next/navigation";
import  axios from 'axios';
import toast from "react-hot-toast";




export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:"",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false);

    // talk to db 
    const onSignup = async () => {
        try {
            setLoading(true)
           const response =  await axios.post("/api/users/signup", user)
           console.log("Signup success", response.data);
           router.push('/login')
           
        } catch (error:any) {
            // react hot toast
            // assignment :: implement react hot toast in better way 
            console.log("signup failed", error.message);
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    };

    React.useEffect(() =>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false); 
        }else{
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
      
       <div className="flex flex-col bg-slate-800 p-6 rounded text-center items-center">
       <h1 className="text-center p-4 text-3xl bg-purple-500 rounded font-extralight mb-8 w-80"> {loading? "Processing" : "Signup Page" } </h1>
       <hr />
         <label htmlFor="username">Username</label>
        <input 
        className="p-2 rounded-lg mb-4 border border-gray-600 focus:outline-none focus:border-gray-600 text-gray-800"
        id="username"
        value={user.username}
        onChange={(e) => setUser({...user, username:e.target.value})}
        type="text"
        placeholder="Enter username"
         />
        
        <label htmlFor="email">Email</label>
        <input 
        className="p-2 rounded-lg mb-4 border border-gray-600 focus:outline-none focus:border-gray-600 text-gray-800"
        id="email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        type="email"
        placeholder="Enter email"
        />

        <label htmlFor="password">Password</label>
        <input 
        className="p-2 rounded-lg mb-4 border border-gray-600 focus:outline-none focus:border-gray-600 text-gray-800"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        type="password"
        placeholder=" Enter password"
        />

        <button 
        
        onClick={onSignup}
        className="p-2 border border-gray-300 focus:outline-none rounded-lg mb-4 focus:border-gray-600"> {buttonDisabled ? "No Signup" : "Signup Here"}</button>
        <Link href='/login' className="bg-gray-700 p-3 rounded-lg"> Visit Login Page </Link>

        </div>
    </div>
    )
}