import React from "react";

const Header = ({ user, logout }) => {
  return (
    <div className="flex justify-between items-center text-white bg-[#111] p-4 rounded-lg shadow">

      {/* USER NAME */}
      <h1 className="text-xl font-bold">
        Welcome {user?.name || user?.email || "User"}
      </h1>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

    </div>
  );
};

export default Header;