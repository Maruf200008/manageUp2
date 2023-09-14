import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

import { BiLockOpenAlt } from "react-icons/bi";
import { TbMail } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useLogingMutation } from "../redux/auth/authApi";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loging, { isLoading, error: responseError, data }] =
    useLogingMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError?.data);
    } else if (data?.accessToken && data?.user) {
      navigate("/task");
    }
  }, [data, responseError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    loging({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="max-w-screen-2xl   mx-auto p-4">
        <div className=" flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="logo" className=" w-[170px]" />
          </Link>
          <div className=" flex items-center gap-5">
            <p className=" text-sm"> Don't have an account? </p>
            <Link to="/signup">
              <button className=" bg-violet-500 hover:bg-violet-700 transition shadow-xl shadow-violet-300  px-5 py-2 rounded-md font-semibold text-white">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center  my-32">
        <div className=" bg-white shadow-2xl shadow-neutral-400/50 w-[450px] h-[450px] py-5 px-14 rounded-md">
          <div>
            <h2 className=" text-[35px] font-bold text-neutral-800 text-center">
              Welcome back!{" "}
            </h2>
            <form className=" mt-10 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-gray-900 ">
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xl text-neutral-600 ">
                    <TbMail />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 focus:outline-none"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-900 ">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xl text-neutral-600 ">
                    <BiLockOpenAlt />
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 focus:outline-none"
                    placeholder="Enter Your Email"
                  />
                </div>
                <div className=" flex items-center justify-center mt-10">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className=" bg-violet-500 w-[270px] hover:bg-violet-700 transition shadow-xl shadow-violet-500/25 rounded-md py-2 text-lg font-bold text-white"
                  >
                    {isLoading ? "Loading..." : "Log In"}
                  </button>
                </div>
                <p className=" text-center text-sm mt-5">
                  Don't have an account?{" "}
                  <Link to="/signup" className=" underline">
                    Sign up
                  </Link>
                </p>
                {error !== "" && (
                  <p className=" text-center mt-2 bg-red-200 py-1 rounded-md text-red-600">
                    Somthing is Error
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
