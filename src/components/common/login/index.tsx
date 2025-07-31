"use client";
import { loginUser } from "@/utils/login";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const { login } = useAuth();
  const router = useRouter();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("login SuccessFully!");
      // Handle successful login
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userID);
      localStorage.setItem("role", data.role);
      // login(); // Assuming this sets the authenticated state
      router.push("/"); // Redirect to a protected page
    },
    onError: (error) => {
      console.error(error.response.data.error);
      toast.error(error.response.data.error);
      // Handle error (e.g., show an error message)
    },
  });

  // components/Login.tsx
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, password }); // Ensure this is an object
  };

  return (
    <div className="">
      <div className="w-[450px] glass-effect rounded-md p-7  bg-transparent drop-shadow-lg shadow-2xl">
        <h1 className="text-[16px] uppercase font-bold text-[#09090b] mb-4">Account Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block  text-sm font-medium text-[#09090b]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="mt-1 block w-full h-[30px] text-[16px] placeholder-black p-2 bg-transparent border-b-[1.5px] border-gray-300 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#09090b]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full h-[30px] text-[16px] p-2 placeholder-black bg-transparent border-b-[1.5px] border-gray-300 focus:outline-none focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 h-[30px] text-[16px] bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <Link href={`/signup`}>
          <h2 className="text-center text-[16px] mt-2 cursor-pointer ">
            Create Account
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Login;
