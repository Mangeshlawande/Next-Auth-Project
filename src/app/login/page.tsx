// "use client";

// import Link from "next/link";
// import React, { useState} from "react";
// import { useRouter } from "next/navigation";
// import axios from 'axios';
// import toast from "react-hot-toast";


// export default function LoginPage(){
//     const router = useRouter();
//     const [user, setUser] = useState({
//         email:"",
//         password:"",
       
//     });
//     const [buttonDisabled, setButtonDisabled] = useState(false)
//     const [loading, setLoading] = useState(false);
    

//     // talk to db 
//     const onLogin = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.post("/api/users/login", user);
//             console.log("Login success", response.data);
//             toast.success("Login success");
//             router.push("/profile");
            
//         } catch (error:any) {
//           // assignment :: implement react hot toast in better way 
//           console.log("signup failed", error.message);
//           toast.error(error.message)
//       } finally{
//           setLoading(false);
//       }
//     };
//     React.useEffect(() =>{
//             if(user.email.length > 0 && user.password.length > 0 ){
//                 setButtonDisabled(false);
//             }else{
//                 setButtonDisabled(true);
//             }
//         }, [user]);


//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">

//        <div className="flex flex-col bg-slate-800 p-6 rounded text-center items-center">
//        <h1 className="text-center p-4 text-3xl bg-purple-500 rounded font-extralight mb-8 w-80">{loading ? "Processing" : "Login Page" }</h1>
//         <hr />
       
//         <label htmlFor="email">Email</label>
//         <input 
//         className="p-2 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
//         id="email"
//         value={user.email}
//         onChange={(e) => setUser({...user, email:e.target.value})}
//         type="email"
//         placeholder="Enter email"
//         />

//         <label htmlFor="password">Password</label>
//         <input 
//         className="p-2 rounded-lg  border border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
//         id="password"
//         value={user.password}
//         onChange={(e) => setUser({...user, password:e.target.value})}
//         type="password"
//         placeholder=" Enter password"
//         />
//         <Link className="mb-4  mt-1 text-blue-500"
//          href='/forgotpassword'> Forgot Password... </Link>


//         <button 
//         onClick={onLogin}
//         className="p-2 border border-gray-300 focus:outline-none rounded-lg mb-4 focus:border-gray-600"> {buttonDisabled ? "No Login" : "Login Here"}</button>
//         <Link href='/signup' className="bg-gray-700 p-3 rounded-lg"> Visit Signup Page </Link>
//         </div> 
       
//     </div>
//     )
// }



"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false); // Track login failure

    // Talk to db 
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");

            // Reset the failed login state after a successful login
            setLoginFailed(false);

        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error("Login failed! Incorrect email or password.");
            
            // Set loginFailed to true if login fails
            setLoginFailed(true);

        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <div className="flex flex-col bg-slate-800 p-6 rounded text-center items-center">
                <h1 className="text-center p-4 text-3xl bg-purple-500 rounded font-extralight mb-8 w-80">{loading ? "Processing" : "Login Page"}</h1>
                <hr />

                <label htmlFor="email">Email</label>
                <input
                    className="p-2 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    type="email"
                    placeholder="Enter email"
                />

                <label htmlFor="password">Password</label>
                <input
                    className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type="password"
                    placeholder=" Enter password"
                />

                {/* Conditionally show Forgot Password link if login fails */}
                {loginFailed && (
                    <div className="text-red-500 mt-2">
                        Incorrect email or password. Please try again.
                    </div>
                )}
                
                {/* Display the Forgot Password link if login failed */}
                {loginFailed && (
                    <Link className="mb-4 mt-1 text-blue-500" href='/forgot-password'> Forgot Password? </Link>
                )}

                <button
                    onClick={onLogin}
                    className="p-2 mt-3 border border-gray-300 focus:outline-none rounded-lg mb-4 focus:border-gray-600">
                    {buttonDisabled ? "No Login" : "Login Here"}
                </button>

                <Link href='/signup' className="bg-gray-700 p-3 rounded-lg"> Visit Signup Page </Link>
            </div>

        </div>
    )
}
