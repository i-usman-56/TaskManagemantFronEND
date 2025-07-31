// components/Signup.tsx
"use client";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/utils/signup";
// import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const router = useRouter();

  const mutation = useMutation(signupUser, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("User Created SuccesFully");
      // Handle successful sign-up (e.g., redirect to login page)
      router.push("/login"); // Redirect to the login page after successful sign-up
    },
    onError: (error: any) => {
      toast.error(error?.response.data.error);
      // Handle error (e.g., show an error message)
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6 || confirmPassword.length < 6) {
      toast.warning("Password Length must be 6 or Greter");
      return;
    }
    // Optionally, add client-side validation for password confirmation
    // if (password !== confirmPassword) {
    //   toast.warn("Passwords do not match!");
    //   return;
    // }

    mutation.mutate({ username, password, confirmPassword }); // Trigger the mutation
  };

  return (
    <div className="">
      <div className="w-[450px] glass-effect rounded-md p-7  shadow-2xl">
        <h1 className="text-[16px] text-[#09090b] uppercase font-bold mb-4">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#09090b]">
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
            <label className="block text-[#09090b] text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full h-[30px] text-[16px] placeholder-black p-2 bg-transparent border-b-[1.5px] border-gray-300 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <label className="block text-[#09090b] text-sm font-medium ">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="mt-1 block w-full h-[30px] text-[16px] placeholder-black p-2 bg-transparent border-b-[1.5px] border-gray-300 focus:outline-none focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 h-[30px] text-[16px] bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {mutation.isLoading ? "Creating..." : "Submit"}
          </button>
          {/* {mutation.isError && (
            <div className="text-red-500 mt-2">
              {mutation.error instanceof Error ? mutation.error.message : 'Sign-up failed'}
            </div>
          )} */}
        </form>
        <Link href={`/pages/login`}>
          <h2 className="text-center text-[16px] mt-2 cursor-pointer ">
            Already Have an Account
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
