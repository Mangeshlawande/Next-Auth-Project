// inside that will be able to grab the user id , later on learn how to protect this profile pages 


import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default async function UserProfile({params}:any) {
   
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center p-4 text-4xl bg-purple-500 rounded font-extralight mb-8 w-80"> User Profile  </h1>
            <hr />
            <p className="text-2xl">Profile Page 
                <span className="p-3 ml-3 rounded bg-green-500 text-black">{ params.id}</span>
            </p>

            {/* how to grab profile/123 */}
            

        </div>
    )
}