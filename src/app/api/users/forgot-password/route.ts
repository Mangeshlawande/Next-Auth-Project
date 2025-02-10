// /app/api/users/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModels"; // Assuming you have a user model
import { sendEmail } from "@/helpers/mailer"; // Assuming you have a mailer utility
import { connect } from "@/dbConfig/dbConfig"; // DB connection

connect();

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate a reset token and its expiration date
    const token = bcrypt.hashSync(Math.random().toString(36).substr(2), 10);
    const tokenExpiry = Date.now() + 3600000; // 1 hour expiry


    // Save the reset token and expiry in the user record
    
    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpiry = tokenExpiry;
    await user.save();

    // Send the reset token via email (you can send the token in a link)
    await sendEmail({email, emailType: "RESET", userId: user._id})


    return NextResponse.json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
