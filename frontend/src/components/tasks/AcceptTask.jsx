import React from "react";

const AcceptTask = ({ data }) => {
  return (
    <div className="bg-yellow-400 p-4 rounded text-black">

      <h3 className="text-xs bg-black text-white inline-block px-2 py-1 rounded">
        {data?.status}
      </h3>

      <h2 className="mt-3 text-xl font-bold">
        {data?.title}
      </h2>

      <p className="mt-2">
        {data?.description}
      </p>

      <p className="text-xs mt-2">
        {data?.createdAt?.slice(0, 10)}
      </p>

    </div>
  );
};

export default AcceptTask;