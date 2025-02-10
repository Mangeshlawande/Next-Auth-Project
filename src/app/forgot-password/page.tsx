// ForgotPassword.tsx
"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/users/forgot-password", { email });
      toast.success("Password reset email sent.");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <div className="flex flex-col bg-slate-800 p-6 rounded-lg text-center items-center">
        <h1>Forgot Password</h1>
        <input
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={onSubmit} disabled={loading}
          className="p-2 mt-3 border border-gray-300 focus:outline-none rounded-lg mb-4 focus:border-gray-600">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>

    </div>
  );
}
/**
 *  
 */