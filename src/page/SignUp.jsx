import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";

import { BiLockOpenAlt, BiUser } from "react-icons/bi";
import { TbMail } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/auth/authApi";
export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [register, { data, isLoading, error: responseError }] =
    useRegisterMutation();

  useEffect(() => {
    console.log(data);
    if (responseError?.data) {
      setError(responseError?.data);
    } else if (data?.accessToken && data?.user) {
      navigate("/task");
    }
  }, [data, responseError, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (password === confirmPassword) {
      register({
        name,
        email,
        password,
        bio: "",
        profile: "",
        img: "",
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setError("Password do not match!!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl   mx-auto p-4">
        <div className=" flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="logo" className=" w-[170px]" />
          </Link>
          <div className=" flex items-center gap-5">
            <p className=" text-sm"> Already playing with ManageUp? </p>
            <Link to="/">
              <button className=" bg-violet-500 hover:bg-violet-700 transition shadow-xl shadow-violet-300 px-5 py-2 rounded-md font-semibold text-white">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center  my-10">
        <div className=" bg-white shadow-2xl shadow-neutral-400/50 w-[450px] h-[600px] py-5 px-14 rounded-md">
          <div>
            <h2 className=" text-[35px] font-bold text-neutral-800 text-center">
              Let's go!{" "}
            </h2>
            <form className=" mt-10 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-gray-900 ">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xl text-neutral-600 ">
                    <BiUser />
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-900 ">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xl text-neutral-600 ">
                    <TbMail />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 focus:outline-none"
                    placeholder="Enter Your Email"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-900 ">
                  Choose Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xl text-neutral-600 ">
                    <BiLockOpenAlt />
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 focus:outline-none"
                    placeholder="Enter Password"
                  />
                </div>

                <label className="block mb-2 text-sm text-gray-900  mt-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-xl text-neutral-600 ">
                    <BiLockOpenAlt />
                  </div>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    type="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 focus:outline-none"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className=" flex items-center justify-center mt-10">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className=" bg-violet-500 w-[270px] hover:bg-violet-700 transition shadow-xl shadow-violet-500/25 rounded-md py-2  font-bold text-white"
                  >
                    Play With ManageUp
                  </button>
                </div>
                <p className=" text-center text-sm mt-5">
                  Already playing with {""}
                  <Link to="/" className=" underline">
                    ManageUp?
                  </Link>
                </p>
                {error !== "" && (
                  <p className=" text-center text-red-600">{error}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
