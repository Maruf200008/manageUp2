import { useEffect, useState } from "react";

import Calendar from "react-calendar";
import { BsFlag, BsFlagFill } from "react-icons/bs";

import { GrClear } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useEditTaskMutation, useGetTaskQuery } from "../redux/task/taskApi";
import { hideToggle } from "../redux/task/taskSlice";
import { useGetUserQuery } from "../redux/user/userApi";

export const EditModal = ({ id }) => {
  //   call the api
  const { error: resError, data: singleTask } = useGetTaskQuery(id);

  const [showPriority, setShowPriority] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [assaginTask, setAssaginTask] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("High");
  const [progress, setProgress] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [date, setDate] = useState("");
  const [showCalender, setShowCalender] = useState(false);
  const [assaginUser, setAssaginUser] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showUserNameModal, setShowUserNameModal] = useState(false);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleDate = (value) => {
    setDate(value);
    let month = monthNames[value.getMonth()] + " ";
    let day = value.getDate();
    setDate(month + day);
    setShowCalender(false);
  };

  const handlePriority = (value) => {
    setPriority(value);
    setShowPriority(false);
  };
  let priprotyColor;
  if (priority === "Urgent") {
    priprotyColor = "text-red-600";
  } else if (priority === "High") {
    priprotyColor = "text-yellow-500";
  } else if (priority === "Normal") {
    priprotyColor = "text-blue-500";
  } else if (priority === "Low") {
    priprotyColor = "text-neutral-500";
  }
  const handleProgress = (value) => {
    setProgress(value);
    setShowProgress(false);
  };

  // progress active
  let activeProgress;
  let progressColor;

  if (progress === "") {
    activeProgress = "Progress";
    progressColor = "bg-neutral-100 text-neutral-700";
  } else if (progress === "Pending") {
    activeProgress = "Pending";
    progressColor = "bg-violet-200 text-violet-700";
  } else if (progress === "InProgress") {
    activeProgress = "In Progress";
    progressColor = "bg-orange-200 text-orange-700";
  } else if (progress === "Completed") {
    activeProgress = "Completed";
    progressColor = "bg-green-200 text-green-700";
  }

  const handleAssignTask = (value) => {
    setAssaginTask(value);
  };

  const {
    data: users,
    isLoading,
    error: responseError,
  } = useGetUserQuery(assaginTask, {
    skip: false,
  });

  const handleAssignUser = (value) => {
    setAssaginUser(value);
    setShowUserNameModal(false);
  };

  // show user
  let showUser;

  if (isLoading) {
    showUser = <div>Is Loding</div>;
  } else if (!isLoading && responseError) {
    showUser = <div>{responseError?.data}</div>;
  } else if (!isLoading && !responseError && users.length === 0) {
    showUser = <div>User Not Found!!</div>;
  } else if (!isLoading && !responseError && users.length > 0) {
    showUser = users.slice(0, 3).map((user) => (
      <div key={user.id} className=" flex flex-col">
        <p
          onClick={() => handleAssignUser(user)}
          className="space-y-5 cursor-pointer text-neutral-800 py-1 "
        >
          {user?.name}
        </p>
      </div>
    ));
  }

  //   show or hide modal
  const { toggle: isShownModal } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const handleModal = () => {
    dispatch(hideToggle());
  };

  useEffect(() => {
    if (singleTask) {
      console.log(singleTask);
      const { assainFor, date, description, priority, progress, title } =
        singleTask || {};
      setTaskTitle(title);
      setAssaginTask(assainFor?.name);
      setDesc(description);
      setPriority(priority);
      setDate(date);
      setProgress(progress);
    }
  }, [singleTask]);

  const [EditTask] = useEditTaskMutation();
  // update task
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(assaginTask);
    // EditTask({id, data : {
    //     title: taskTitle,
    //     assainFor: assaginUser,
    //     description: desc,
    //     priority: priority,
    //     date,
    //     progress,
    //   }});

    setTaskTitle("");
    setAssaginUser("");
    setAssaginTask("");
    setDesc("");
    setPriority("");
    setDate("");
    setProgress("");
    dispatch(hideToggle());
  };

  return (
    <>
      {isShownModal ? (
        <div
          aria-hidden="true"
          className={
            "fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)] max-h-full"
          }
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative inset-y-[180px] inset-x-[75%] bg-white rounded-lg shadow-2xl ">
              <form action="" onSubmit={handleSubmit}>
                <div className=" p-4 space-y-4">
                  <div className="flex items-start justify-between   rounded-t ">
                    <div
                      className=" flex items-center gap-3"
                      placeholder="Task Name or type '/' for command"
                    >
                      <div className=" w-[15px] h-[15px] bg-neutral-200" />
                      <input
                        onChange={(e) => setTaskTitle(e.target.value)}
                        value={taskTitle}
                        type="text"
                        className="focus:outline-none w-[290px] text-neutral-600"
                        placeholder="Task Name or type '/' for command"
                      />
                    </div>
                    <button
                      onClick={handleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                      data-modal-hide="defaultModal"
                    >
                      <RxCross2 />
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <div>
                    <div className=" flex items-center gap-3">
                      <p className=" text-sm text-neutral-500">For</p>
                      <div>
                        {!assaginUser ? (
                          <input
                            placeholder="Search user by email address"
                            onChange={(e) => handleAssignTask(e.target.value)}
                            value={assaginTask}
                            type="text"
                            className=" px-2 py-1 rounded-md border focus:outline-none w-[400px]"
                          />
                        ) : (
                          <div className=" flex items-center gap-3 w-[500px]">
                            <p className=" bg-neutral-100 p-1 rounded-md  ">
                              {assaginUser?.name}
                            </p>
                          </div>
                        )}

                        {showUserNameModal ? (
                          <div className=" bg-white w-[150px] h-[110px] shadow-lg rounded-md p-2">
                            {showUser}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <textarea
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        name="description"
                        cols="80"
                        rows="5"
                        className="focus:outline-none resize-none border rounded-md p-3 "
                      />
                    </div>
                  </div>
                  <div>
                    <div className=" flex items-center gap-3">
                      <div
                        onClick={() => setShowPriority(!showPriority)}
                        className={` ${priprotyColor} p-2 rounded-full border-dotted border-2 cursor-pointer`}
                      >
                        {priority ? (
                          <BsFlagFill />
                        ) : (
                          <div className=" text-neutral-500">
                            <BsFlag />
                          </div>
                        )}
                      </div>
                      {showPriority ? (
                        <div className=" bg-white shadow-xl rounded-xl bottom-7 p-4 absolute left-[150px] -mt-[80px] w-[190px] h-[240px]">
                          <ul className=" space-y-3">
                            <li
                              onClick={() => handlePriority("Urgent")}
                              className=" flex items-center gap-5 transition hover:bg-neutral-100 p-1 rounded-md cursor-pointer"
                            >
                              <div className=" text-red-600">
                                <BsFlagFill />
                              </div>
                              <p>Urgent</p>
                            </li>
                            <li
                              onClick={() => handlePriority("High")}
                              className=" flex items-center gap-5 transition hover:bg-neutral-100 p-1 rounded-md cursor-pointer "
                            >
                              <div className=" text-yellow-500">
                                <BsFlagFill />
                              </div>
                              <p>High</p>
                            </li>
                            <li
                              onClick={() => handlePriority("Normal")}
                              className=" flex items-center gap-5 transition hover:bg-neutral-100 p-1 rounded-md cursor-pointer"
                            >
                              <div className=" text-blue-500">
                                <BsFlagFill />
                              </div>
                              <p>Normal</p>
                            </li>
                            <li
                              onClick={() => handlePriority("Low")}
                              className=" flex items-center gap-5 border-b  transition hover:bg-neutral-100 p-1 rounded-md cursor-pointer"
                            >
                              <div className=" text-neutral-500">
                                <BsFlagFill />
                              </div>
                              <p>Low</p>
                            </li>

                            <li
                              onClick={() => handlePriority("")}
                              className=" flex items-center gap-5 transition hover:bg-neutral-100 p-1 rounded-md cursor-pointer "
                            >
                              <div className=" text-neutral-500">
                                <GrClear />
                              </div>
                              <p>Clear</p>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      {!date ? (
                        <div
                          onClick={() => setShowCalender(!showCalender)}
                          className=" text-neutral-200 cursor-pointer  p-2 rounded-full border-dotted border-2"
                        >
                          <MdDateRange />
                        </div>
                      ) : (
                        <div
                          onClick={() => setShowCalender(!showCalender)}
                          className=" text-neutral-600 cursor-pointer  p-2 "
                        >
                          <div className=" flex items-center gap-3 text-sm">
                            <div>
                              <MdDateRange />
                            </div>
                            <p>{date}</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <p
                          onClick={() => setShowProgress(!showProgress)}
                          className={`${progressColor} p-1 rounded-md cursor-pointer`}
                        >
                          {activeProgress}
                        </p>
                        {showProgress ? (
                          <div className=" bg-white text-neutral-700 absolute w-[120px] h-[140px] shadow-lg rounded-md bottom-28 p-3">
                            <div className=" space-y-2">
                              <p
                                onClick={() => handleProgress("Pending")}
                                className=" bg-violet-200 text-violet-700 p-1 rounded-md  cursor-pointer"
                              >
                                Pending
                              </p>
                              <p
                                onClick={() => handleProgress("InProgress")}
                                className=" bg-orange-200 text-orange-700 p-1 rounded-md   cursor-pointer"
                              >
                                In Progress
                              </p>
                              <p
                                onClick={() => handleProgress("Completed")}
                                className=" bg-green-200 text-green-700 p-1 rounded-md  cursor-pointer"
                              >
                                Completed
                              </p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {showCalender ? (
                      <div className=" absolute bg-white bottom-32 shadow-xl p-4">
                        <Calendar onChange={handleDate} value={date} />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className=" flex items-center justify-end">
                      <button
                        type="submit"
                        className=" bg-violet-500 px-3 py-2 rounded-md text-white hover:bg-violet-700 transition"
                      >
                        + Create Task
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
