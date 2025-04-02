import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./validation/AuthUser";

function Login() {
  const { authUser, setAuthUser } = useAuthContext();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  function getInputValue(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleInputError({ username, password }) {
    if (!username || !password) {
      toast.error("all fields are mendatory ");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleInputError(loginData);
    if (!success) return;
    try {
      const lgoin = await axios
        .post("https://snaptalk-back.vercel.app/api/auth/login", loginData)
        .then((res) => {
          console.log(res);
          if (res.data.status !== true) {
            toast.error("username and Password don't match.");
          }
          if (res.data.status === true) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("chat-user", JSON.stringify(res.data.user));
            //  context
            setAuthUser(res.data.user);
            toast.success("Successfull Login");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            toast.error("try again..");
          }
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="p-4 h-screen flex items-center justify-center bg-dark1 text-white">
        <div className="flex flex-col justify-center min-w-96 mx-auto">
          <div className="xl:w-full lg:w-full md:w-full p-6 rounded-lg shadow-md shadow-slate-300 mx-4">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
              Login <span className="text-blue-500">ChatApp</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="" className="label p-2">
                  <span className="text-base">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={getInputValue}
                  placeholder="Enter Username"
                  className="input input-bordered w-full max-w-xs rounded-lg text-black"
                />
              </div>

              <div>
                <label htmlFor="" className="label p-2">
                  <span className="text-base">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={getInputValue}
                  placeholder="Enter Password"
                  className="input input-bordered w-full max-w-xs  text-black"
                />
              </div>

              <div className="mt-3">
                <Link to="/signup">Don't have an account?</Link>
              </div>

              <div>
                <button className="btn btn-block btn-sm mt-2 hover:bg-blue-500 hover:border-none">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
