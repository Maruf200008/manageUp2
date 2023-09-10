import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFlag, BsFlagFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { useDeleteTaskMutation, useGetTasksQuery } from "../redux/task/taskApi";

import { RiDeleteBin6Line } from "react-icons/ri";

export const TaskDetails = () => {
  const { isLoading, isError, data: tasks } = useGetTasksQuery();



  const [currentId, setCurrentId] = useState("");
  let content;

  const [deleteTask] = useDeleteTaskMutation();

  // handle delete
  const handleDelete = (id) => {
    deleteTask(id);
  };

  // handle edit

  const handleEdit = (id) => {
    setCurrentId(id);
  };

  // handle toggle
  const handleToggle = () => {
    setShowModal();
  };

  if (isLoading) {
    content = <div> Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>Somthing Is rong!!</div>;
  } else if (!isLoading && !isError && tasks.length === 0) {
    content = <div>Not Task Found!!!</div>;
  } else if (!isLoading && !isError && tasks.length > 0) {
    content =
      tasks &&
      tasks.map((task) => {
        const { assainFor, date, id, description, priority, progress, title } =
          task || {};
        console.log(task);
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

        // progress color
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

        return (
          <div key={id} className=" border rounded-md mt-10 p-4">
            <div></div>
            <div className=" mt-7">
              <div className=" flex items-center justify-between">
                <div className=" flex items-center gap-4">
                  <div className=" flex items-center gap-3">
                    <div className=" w-[15px] h-[15px] bg-neutral-300 rounded-md"></div>
                    <h2>{task && title}</h2>
                  </div>
                  <div className=" flex items-center gap-3">
                    <div
                    
                      className="flex items-center gap-3"
                    >
                      {/* {currentId !== "" && <EditModal id={currentId} />} */}
                      <div
                        onClick={() => handleEdit(id)}
                        className="bg-green-200 hover:bg-green-600 hover:text-white transition text-green-500 p-1 rounded-md cursor-pointer"
                      >
                        <AiOutlineEdit />
                      </div>
                    </div>
                    <div
                      onClick={() => handleDelete(id)}
                      className=" bg-orange-200 hover:bg-orange-600 hover:text-white transition text-orange-500 p-1 rounded-md cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                </div>
                <div className=" flex gap-8 ">
                  <div className=" flex items-center flex-col gap-2">
                    <p className=" text-[10px] text-neutral-400 uppercase">
                      Assignee
                    </p>
                    <p className=" text-sm text-neutral-700">
                      {assainFor?.name}
                    </p>
                  </div>
                  <div className=" flex items-center flex-col gap-2">
                    <p className=" text-[10px] text-neutral-400 uppercase">
                      Due Date
                    </p>
                    <div className=" text-neutral-400 text-xl flex items-center gap-2">
                      <MdDateRange />
                      <p className=" text-sm">{date}</p>
                    </div>
                  </div>
                  <div className=" flex items-center flex-col gap-2">
                    <p className=" text-[10px] text-neutral-400 uppercase">
                      Progress
                    </p>
                    <div
                      className={`${progressColor} rounded-md px-1 text-sm flex items-center gap-2`}
                    >
                      {activeProgress}
                    </div>
                  </div>
                  <div className=" flex items-center flex-col gap-2">
                    <p className=" text-[10px] text-neutral-400 uppercase">
                      Priority
                    </p>
                    <div className={`${priprotyColor} text-xl`}>
                      {priority ? <BsFlagFill /> : <BsFlag />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" bg-slate-100 mt-4 rounded-md p-3">
              <p>{description}</p>
            </div>
          </div>
        );
      });
  }

  return content;
};
