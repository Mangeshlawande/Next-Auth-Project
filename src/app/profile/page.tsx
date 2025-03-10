"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("Nothing")
    const [user, setUser] = useState()
    const [email, setEmail] = useState()

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        console.log(res.data.data.username);
        console.log(res.data.data._id);
        console.log(res.data.data.email);
        setUser(res.data.data.username);
        setEmail(res.data.data.email)
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

<div className="flex flex-col bg-slate-800 p-6 rounded text-center items-center">

            <h1 className="text-center p-4 text-3xl bg-purple-500 rounded font-extralight mb-8 w-80">Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500 my-3"> Id :: {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />
            <h2>Email :{email}</h2>
            <h2>Name :{user}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>

                </div>
            </div>
    )
}