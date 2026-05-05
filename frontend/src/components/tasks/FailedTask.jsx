import React from "react";

const FailedTask = ({ data }) => {
  return (
    <div className="flex-shrink-0 w-[300px] bg-red-500 text-white rounded-xl p-5 shadow-md">

      {/* Top Section */}
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

      {/* Status Button */}
      <div className="mt-5">
        <button className="w-full bg-black text-white py-2 rounded-lg">
          {data?.status}
        </button>
      </div>

    </div>
  );
};

export default FailedTask;