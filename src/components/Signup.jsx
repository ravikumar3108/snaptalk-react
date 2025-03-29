import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function Signup() {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  console.log(inputs);

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
      toast.error("fill all the fields");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("confirm password is not matched");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at 6 character");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleInputError(inputs);
    if (!success) return;
    try {
      await axios
        .post("https://snaptalk-back.vercel.app/api/auth/signup", inputs)
        .then((res) => {
          if(res.data.status === true){
            toast.success("Account Created")
          }
          else if(res.data.status === false){
            toast.error("User already registered...")
          }else{
            toast("Create new account")
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
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="xl:w-full lg:w-full md:w-full  p-6 rounded-lg shadow-md  shadow-slate-300">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up <span className="text-blue-500"> ChatApp</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full name"
                name="fullname"
                className="w-full input input-bordered  h-10  text-black"
                onChange={getValue}
              />
            </div>

            <div>
              <label className="label p-2 ">
                <span className="text-base">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={getValue}
                className="w-full input input-bordered h-10  text-black"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base">Password</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={getValue}
                placeholder="Enter Password"
                className="w-full input input-bordered h-10  text-black"
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={getValue}
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10  text-black"
              />
            </div>

            {/* Gender Button here */}
            <div className="flex">
              <div className="form-control">
                <label
                  className={`label gap-2 cursor-pointer ${
                    inputs.gender === "male" ? "selected" : ""
                  }`}
                >
                  <span>Male</span>
                  <input
                    type="checkbox"
                    name="gender"
                    className={`checkbox border-slate-300 bg-white  text-black`}
                    checked={inputs.gender === "male"}
                    onChange={() => handleCheckboxChange("male")}
                  />
                </label>
              </div>
              <div className="form-control">
                <label
                  className={`label gap-2 cursor-pointer ${
                    inputs.gender === "female" ? "selected" : ""
                  }`}
                >
                  <span>Female</span>
                  <input
                    type="checkbox"
                    className="checkbox border-slate-300 bg-white text-black"
                    name="gender"
                    onChange={() => handleCheckboxChange("female")}
                    checked={inputs.gender === "female"}
                  />
                </label>
              </div>
            </div>

            <Link
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
              to="/login"
            >
              Already have an account?
            </Link>

            <div>
              <button className="btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-blue-500 hover:border-none">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default Signup;
