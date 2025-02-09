import  {connect} from "@/dbConfig/dbConfig";
import  User from '@/models/userModels'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



connect()



// mandatory  to write post method 
export async function POST(request:NextRequest) {
        try {
            // data comes from front end
            const reqBody = await request.json();
            const {username, email, password} = reqBody

            // check user already exist 
          const user = await User.findOne({email})

          if(user){
            return NextResponse.json({error:"User already exists"}, {status:404});
          }

          // hash password 
          const salt = await bcryptjs.genSalt(10)
          const hashPassword = await bcryptjs.hash(password, salt)

         const newUser = new User({
            username,
            email,
            password:hashPassword,
          });
            const savedUser = await newUser.save();

            console.log(savedUser);
          return NextResponse.json({
            message:"User  Created Successfully",
            success:true,
            savedUser
          });

          

        } catch (error : any) {
            return NextResponse.json({error:error.message}, {status:500})
            
        }
}