import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsTrophy } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import logo from "../assets/images/logo.png";
import { addFilter, removeFilter } from "../redux/filter/filterSlice";
import { showHome, showProfile } from "../redux/user/userSlice";

export const Sidebar = () => {
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setFilter(value);
    dispatch(addFilter(value));
  };

  const handleClear = () => {
 
    dispatch(removeFilter());
  };

  const handleShownHome = () => {
    console.log("Home")
    dispatch(showHome())
    
  }
  const handleShownProfile = () => {
    console.log("Profile")
    dispatch(showProfile())
   
  }

  return (
    <div className=" ">
      <div className=" space-y-4 ">
        <img src={logo} alt="logo" className=" w-[160px]" />
        <div>
          <fieldset>
            <legend className="sr-only">Countries</legend>

            <div className="flex items-center mb-4">
              <input
                onClick={() => handleChange("Completed")}
                type="radio"
                name="status"
                value={filter}
                className="w-4 h-4 border-gray-300 focus:outline-none"
              />
              <label className="block ml-2 text-sm font-medium text-neutral-700 ">
                Completed
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                onClick={() => handleChange("InProgress")}
                type="radio"
                name="status"
                value={filter}
                className="w-4 h-4 border-gray-300 focus:outline-none"
              />
              <label className="block ml-2 text-sm font-medium text-neutral-700 ">
                In Irogress
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                onClick={() => handleChange("Pending")}
                type="radio"
                name="status"
                value={filter}
                className="w-4 h-4 border-gray-300 focus:outline-none"
              />
              <label className="block ml-2 text-sm font-medium text-neutral-700 ">
                Pending
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                onClick={handleClear}
                type="radio"
                name="status"
                value={filter}
                className="w-4 h-4 border-gray-300 focus:outline-none"
              />
              <label className="block ml-2 text-sm font-medium text-neutral-700 ">
                Clear
              </label>
            </div>
          </fieldset>
        </div>
        <div onClick={handleShownHome} className=" flex items-center gap-3 hover:bg-gray-100 cursor-pointer py-2 px-3 transition rounded-md mr-3 text-gray-600">
          <IoHomeOutline />
          <p>Home</p>
        </div>
        <div onClick={handleShownProfile} className=" flex items-center gap-3 hover:bg-gray-100 cursor-pointer py-2 px-3 transition rounded-md mr-3 text-gray-600">
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
