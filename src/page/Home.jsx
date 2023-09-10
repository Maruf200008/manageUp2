import React from "react";
import { useDispatch } from "react-redux";
import profile from "../assets/images/man.jpg";
import { Modal } from "../components/Modal";
import { Sidebar } from "../components/Sidebar";
import { TaskDetails } from "../components/TaskDetails";
import { userLogOut } from "../redux/auth/authSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const handleClike = () => {
    dispatch(userLogOut());
  };
  return (
    <div className="max-w-screen-2xl   mx-auto p-4 relative ">
      <div className=" flex items-center justify-end">
        <div className=" flex items-center gap-5 ">
          <img src={profile} alt="profile" className=" w-[30px] rounded-full" />
          <button
            onClick={handleClike}
            className=" bg-violet-400 px-5 py-1 rounded-md text-white font-semibold hover:bg-violet-700 transition shadow-xl shadow-violet-200"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className=" grid grid-cols-12 gap-3">
        <div className=" col-span-3">
          <Sidebar />
        </div>
        <div className=" col-span-7 ">
          <TaskDetails />
        </div>
      </div>
      <div className="   ">
        <div className=" flex items-center justify-end  ">
          <Modal />
        </div>
      </div>
    </div>
  );
};
