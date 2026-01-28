import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./validation/AuthUser";

function Login() {
  const { setAuthUser } = useAuthContext();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function getInputValue(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      return toast.error("All fields are mandatory");
    }
    try {
      // const res = await axios.post(
      //   "https://snaptalk-back.vercel.app/api/auth/login",
      //   loginData,
      // );
      const res = await axios.post("http://localhost:8000/api/auth/login", loginData);
      if (res.data.status === true) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("chat-user", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);
        toast.success("Successful Login");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen w-full flex items-center justify-center bg-[#111b21] relative overflow-hidden font-sans">
        {/* Top Green Bar - Hidden on very small screens if needed, but looks good as branding */}
        <div className="absolute top-0 left-0 w-full h-[150px] md:h-[220px] bg-[#00a884]"></div>

        {/* Responsive Login Card */}
        <div
          className="z-10 bg-[#f0f2f5] dark:bg-[#222e35] shadow-2xl 
                        w-full h-full sm:h-auto sm:max-w-[450px] md:max-w-[500px] 
                        sm:rounded-sm p-6 sm:p-10 flex flex-col justify-center"
        >
          {/* Logo & Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="flex justify-center mb-3">
              <svg
                viewBox="0 0 24 24"
                width="50"
                height="50"
                className="text-[#00a884] fill-current md:w-[60px] md:h-[60px]"
              >
                <path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.543 3.838-2.543 6.158 0 1.61.442 3.19 1.282 4.588l-1.36 4.965 5.083-1.333c1.35.753 2.871 1.15 4.428 1.15h.004c2.32 0 4.518-.903 6.159-2.544 1.64-1.64 2.544-3.838 2.544-6.159 0-2.319-.903-4.519-2.544-6.159s-3.839-2.543-6.159-2.543h-.033zm8.01 13.59c-1.332 1.331-3.102 2.064-4.985 2.064h-.003c-1.258 0-2.492-.321-3.585-.928l-.258-.143-2.665.699.712-2.599-.158-.251c-.657-1.045-1.004-2.257-1.004-3.504 0-1.882.733-3.652 2.064-4.984 1.332-1.332 3.102-2.065 4.984-2.065s3.652.733 4.984 2.065c1.332 1.331 2.064 3.102 2.064 4.984 0 1.882-.732 3.652-2.064 4.984z"></path>
              </svg>
            </div>
            <h1 className="text-2xl md:text-[28px] font-light text-[#41525d] dark:text-[#e9edef]">
              Login SnapTalk
            </h1>
            <p className="text-[#667781] text-xs md:text-sm mt-2">
              Enter your credentials to start chatting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative border-b border-[#e9edef] dark:border-[#3b4a54] pb-1">
              <label className="text-[11px] text-[#00a884] font-medium block uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={getInputValue}
                placeholder="Type here..."
                className="bg-transparent w-full py-2 outline-none text-[#111b21] dark:text-[#d1d7db] placeholder-[#8696a0]/50 text-base"
              />
            </div>

            <div className="relative border-b border-[#e9edef] dark:border-[#3b4a54] pb-1">
              <label className="text-[11px] text-[#00a884] font-medium block uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={getInputValue}
                placeholder="********"
                className="bg-transparent w-full py-2 outline-none text-[#111b21] dark:text-[#d1d7db] placeholder-[#8696a0]/50 text-base"
              />
            </div>

            <div className="text-center">
              <Link
                to="/signup"
                className="text-xs text-[#667781] hover:text-[#00a884] transition-colors"
              >
                New to SnapTalk?{" "}
                <span className="text-[#00a884] font-semibold underline underline-offset-4">
                  Create an account
                </span>
              </Link>
            </div>

            <div className="flex justify-center pb-4">
              <button className="bg-[#00a884] text-white w-full sm:w-auto px-10 py-3 rounded-md font-medium hover:bg-[#06cf9c] transition-all shadow-md active:scale-95 uppercase text-sm tracking-wider">
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Footer for desktop */}
        <div className="hidden sm:flex absolute bottom-8 text-[#8696a0] text-[10px] items-center gap-2 uppercase tracking-[2px]">
          <div className="w-3 h-3 border border-[#8696a0] rounded-full flex items-center justify-center text-[8px]">
            L
          </div>
          Secure & Private Connection
        </div>
      </div>
    </>
  );
}

export default Login;
