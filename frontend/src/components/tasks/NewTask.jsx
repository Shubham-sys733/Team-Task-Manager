import React from "react";
import { api } from "../services/api";

const NewTask = ({ data }) => {
  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/tasks/${data._id}`,
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Task updated:", res.data);

      // simple refresh (later you can improve with state update)
      window.location.reload();
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  return (
    <div className="flex-shrink-0 w-[300px] bg-blue-500 text-white rounded-xl p-5 shadow-md">

      {/* Top */}
      <div className="flex justify-between items-center">
        <h3 className="bg-black/30 text-xs px-3 py-1 rounded-full">
          {data?.status}
        </h3>
        <h4 className="text-xs opacity-80">
          {data?.createdAt?.slice(0, 10)}
        </h4>
      </div>

      {/* Title */}
      <h2 className="mt-5 text-2xl font-bold">
        {data?.title}
      </h2>

      {/* Description */}
      <p className="text-sm mt-2 opacity-90">
        {data?.description}
      </p>

      {/* Button */}
      <div className="mt-5">
        <button
          onClick={handleAccept}
          className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100"
        >
          Accept Task
        </button>
      </div>

    </div>
  );
};

export default NewTask;