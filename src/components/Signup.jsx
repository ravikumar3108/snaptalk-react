import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Listings from "./validation/Listing";

function Signup() {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const getValue = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  async function handleInputError({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleInputError(inputs);
    if (!success) return;
    try {
      const main = new Listings();
      const res = await main.signupUser(inputs);
      // const res = await axios.post(
      //   "https://snaptalk-back.vercel.app/api/auth/signup",
      //   inputs,
      // );
      if (res.data.status === true) {
        toast.success("Account Created Successfully");
      } else {
        toast.error(res.data.message || "User already registered...");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen w-full flex items-center justify-center bg-[#111b21] relative overflow-x-hidden py-10 md:py-0">
        {/* Top Green Bar */}
        <div className="absolute top-0 left-0 w-full h-[150px] md:h-[220px] bg-[#00a884]"></div>

        {/* Signup Card */}
        <div
          className="z-10 bg-[#f0f2f5] dark:bg-[#222e35] shadow-2xl 
                        w-full h-full sm:h-auto sm:max-w-[500px] 
                        sm:rounded-sm p-6 md:p-10 flex flex-col justify-center mx-4"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-[28px] font-light text-[#41525d] dark:text-[#e9edef]">
              Create Account
            </h1>
            <p className="text-[#667781] text-xs mt-2">
              Join SnapTalk to start messaging
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative border-b border-[#e9edef] dark:border-[#3b4a54] pb-1">
              <label className="text-[11px] text-[#00a884] font-medium block uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Type Your Name"
                className="bg-transparent w-full py-1.5 outline-none text-[#111b21] dark:text-[#d1d7db] placeholder-[#8696a0]/50 text-sm"
                onChange={getValue}
              />
            </div>

            {/* Username */}
            <div className="relative border-b border-[#e9edef] dark:border-[#3b4a54] pb-1">
              <label className="text-[11px] text-[#00a884] font-medium block uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="username123"
                className="bg-transparent w-full py-1.5 outline-none text-[#111b21] dark:text-[#d1d7db] placeholder-[#8696a0]/50 text-sm"
                onChange={getValue}
              />
            </div>

            {/* Passwords Row (Responsive Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative border-b border-[#e9edef] dark:border-[#3b4a54] pb-1">
                <label className="text-[11px] text-[#00a884] font-medium block uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  className="bg-transparent w-full py-1.5 outline-none text-[#111b21] dark:text-[#d1d7db] text-sm"
                  onChange={getValue}
                />
              </div>
              <div className="relative border-b border-[#e9edef] dark:border-[#3b4a54] pb-1">
                <label className="text-[11px] text-[#00a884] font-medium block uppercase tracking-wider">
                  Confirm
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="******"
                  className="bg-transparent w-full py-1.5 outline-none text-[#111b21] dark:text-[#d1d7db] text-sm"
                  onChange={getValue}
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div className="flex gap-6 pt-2">
              <span className="text-sm text-[#667781]">Gender:</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#00a884] cursor-pointer"
                    checked={inputs.gender === "male"}
                    onChange={() => handleCheckboxChange("male")}
                  />
                  <span
                    className={`text-sm ${inputs.gender === "male" ? "text-[#00a884] font-medium" : "text-[#667781]"}`}
                  >
                    Male
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#00a884] cursor-pointer"
                    checked={inputs.gender === "female"}
                    onChange={() => handleCheckboxChange("female")}
                  />
                  <span
                    className={`text-sm ${inputs.gender === "female" ? "text-[#00a884] font-medium" : "text-[#667781]"}`}
                  >
                    Female
                  </span>
                </label>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs text-[#667781] hover:text-[#00a884] transition-colors"
              >
                Already have an account?{" "}
                <span className="text-[#00a884] font-semibold underline underline-offset-4">
                  Login here
                </span>
              </Link>
            </div>

            <div className="flex justify-center pt-4">
              <button className="bg-[#00a884] text-white w-full px-10 py-3 rounded-md font-medium hover:bg-[#06cf9c] transition-all shadow-md active:scale-95 uppercase text-sm tracking-wider">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
