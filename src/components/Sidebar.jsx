import React, { useState } from "react";
import { AiOutlineUser } from 'react-icons/ai';
import { BsSearch, BsTrophy } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import logo from "../assets/images/logo.png";

export const Sidebar = () => {
  const [toggle, setToggle] = useState(false)
 
  return (
    <div className=" ">
      <div className=" space-y-4 ">
        <img src={logo} alt="logo" className=" w-[160px]" />
        <form className=" mr-3">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
              <BsSearch />
            </div>
            <input
              type="search"
              className="block w-full focus:outline-none p-2 pl-10 text-sm text-gray-900  rounded-lg bg-gray-50"
              placeholder="Search..."
            />
          </div>
        </form>

       <div className=" flex items-center gap-3 hover:bg-gray-100 cursor-pointer py-2 px-3 transition rounded-md mr-3 text-gray-600">
         
          <IoHomeOutline />
          <p>Home</p>
        </div>
        <div className=" flex items-center gap-3 hover:bg-gray-100 cursor-pointer py-2 px-3 transition rounded-md mr-3 text-gray-600">
        <AiOutlineUser />
          <p>Profile</p>
        </div>

        <div className=" flex items-center gap-3 hover:bg-gray-100 cursor-pointer py-2 px-3 transition rounded-md mr-3 text-gray-600">
          <BsTrophy />
          <p>Goals</p>
        </div>
      </div>
    </div>
  );
};
