import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import man from "../assets/images/man.jpg";
import { useEditUserMutation } from "../redux/user/userApi";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { bio, name, img, id, email, profile } = user || {};
  console.log(user);
  const [userName, setUserName] = useState(name);
  const [userBio, setUserBio] = useState(bio);
  const [showModal, setShowModal] = useState(false);

  const [editUser] = useEditUserMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser({
      id,
      data: {
        id,
        email,
        bio: userBio,
        name: userName,
        profile,
        img,
      },
    });
    setShowModal(false);
  };

  return (
    <div>
      <div className=" space-y-4">
        <div className=" flex items-center justify-center mt-32 mb-10">
          <img
            src={man}
            alt="img"
            className=" w-[200px] rounded-full  shadow-xl border-4 border-white"
          />
        </div>
        <div className=" flex items-center justify-center space-y-5 flex-col">
          <div className=" flex items-center gap-5">
            <h2 className=" text-[30px] font-semibold text-violet-500">
              {name}
            </h2>
          </div>

          <div className=" w-[500px] bg-neutral-100  p-5 rounded-md space-y-5">
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              dicta consequuntur debitis delectus, similique culpa facilis
              reprehenderit illum. Aperiam ipsum necessitatibus id assumenda
              perspiciatis minima culpa quas quasi, accusamus ea!
            </p>
            <div
              onClick={() => setShowModal(!showModal)}
              className=" flex items-center justify-center text-xl bg-orange-200 text-orange-700 p-2 hover:bg-orange-600 hover:text-white transition rounded-md cursor-pointer w-[60px] mx-auto"
            >
              <AiOutlineEdit />
            </div>

            {showModal ? (
              <div className=" bg-white w-[470px] h-[300px] bottom-[35px] z-30 shadow-xl rounded-xl  border-violet-200 border  absolute p-7">
                <form className=" space-y-3" onSubmit={handleSubmit}>
                  <div className=" ">
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className=" focus:outline-none bg-neutral-100 p-3 w-full rounded-md text-neutral-700"
                      placeholder="Enter Your Name"
                    />
                  </div>

                  <div className=" ">
                    <textarea
                      name="bio"
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      id=""
                      cols="30"
                      rows="5"
                      placeholder="Enter you bio"
                      className=" focus:outline-none text-neutral-700 resize-none bg-neutral-100 w-full rounded-md p-3"
                    />
                  </div>
                  <div className=" flex items-center w-full">
                    <button
                      type="submit"
                      className=" hover:bg-violet-700 transition bg-violet-400 px-10 py-2 rounded-md text-white mx-auto "
                    >
                      Edit Now
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
