import React from "react";
import logo from "../assets/images/logo.png";

export const Navbar = () => {
  return (
    <div className="max-w-screen-2xl   mx-auto p-4">
      <div className=" flex items-center justify-between">
        <a href="#">
          <img src={logo} alt="logo" className=" w-[170px]" />
        </a>
        <div className=" flex items-center gap-5">
          <p className=" text-sm"> Don't have an account? </p>
          <button className=" bg-violet-500 hover:bg-violet-700 transition shadow-xl shadow-violet-300 px-5 py-2 rounded-md font-semibold text-white">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
