
// Reset-Password.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState<string | null>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if(password !== confirmPassword){
      setError(true)
    }else{
      setError(false);
    }
  }, [password, confirmPassword]);


  const onSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!token || !password) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/users/reset-password", { token, password });
      toast.success("Password reset successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl "> {error ? "Password Not Match" : "" }</h1>
      <div className="flex flex-col bg-slate-800 p-6 rounded text-center items-center">
        <h1 className="text-center p-4 text-3xl bg-purple-500 rounded font-extralight mb-8 w-80">{loading ? "Processing" : "Reset Password"}</h1>
        <hr />

        <label htmlFor="password">New Password</label>
        <input
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800 mb-4"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder=" Enter password"
        />
          <label htmlFor="password">Confirm Password</label>

        <input
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-gray-800"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <button onClick={onSubmit} disabled={loading}
          className="p-2 mt-3 border border-gray-300 focus:outline-none rounded-lg my-4 focus:border-gray-600">
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </div>

    </div>
  );
}

