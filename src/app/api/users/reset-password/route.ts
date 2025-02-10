// import { NextResponse, NextRequest } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { connect } from '@/dbConfig/dbConfig'; // Your DB connection
// import User from '@/models/userModels'; // Your user model
// import { sendEmail } from '@/helpers/mailer';
// import { getDataFromToken } from '@/helpers/getDataFromToken';

// connect();

// export async function POST(request: NextRequest) {
//   try {

//     const userId = await getDataFromToken(request);
//     const user1 = await User.findOne({_id: userId}).select("-password");

    
//     return NextResponse.json({
//         mesaaage: "User found",
//         data: user1
//     })


//     const reqBody = await request.json()
//     const {token, password} = reqBody
//     console.log(token);

//     const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

//     if (!user) {
//         return NextResponse.json({error: "Invalid token"}, {status: 400})
//     }
//     console.log(user);

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update the user's password and clear the token fields
//     user.password = hashedPassword;
//     user.forgotPasswordToken = undefined;
//     user.forgotPasswordTokenExpiry = undefined;
//     await user.save();

//     // Optionally, send an email confirmation about the password reset
//     await sendEmail({ email: user.email, emailType: 'RESET', userId: user._id });

//     return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
//   } catch (error: any) {
//     console.error('Error resetting password:', error);
//     return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
//   }
// }



// /app/api/users/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModels"; // Your User Model
import { connect } from "@/dbConfig/dbConfig"; // DB connection

connect();

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Check if the token is expired
    if (user.forgotPasswordTokenExpiry < Date.now()) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and invalidate the token
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
