import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import CreateTask from "../tasks/CreateTask";
import AllTask from "../tasks/AllTask";
import { api } from "../services/api";

const AdminDashboard = ({ user, logout }) => {
  const [tasks, setTasks] = useState([]);

 useEffect(() => {
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN 👉", token); // debug

      const res = await api.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("TASKS 👉", res.data); // debug

      setTasks(res.data);
    } catch (err) {
      console.log("Task fetch error:", err);
    }
  };

  fetchTasks();
}, []);

  return (
    <div className="min-h-screen w-full bg-[#1C1C1C] text-white p-6">

      {/* HEADER */}
      <Header user={user} logout={logout} />

      {/* TITLE */}
      <h1 className="text-3xl font-bold mt-6">
        Admin Dashboard
      </h1>

      {/* TASK SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        {/* CREATE TASK */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl shadow-lg">
          <CreateTask />
        </div>

        {/* TASK LIST */}
        <div className="bg-[#2a2a2a] p-4 rounded-xl shadow-lg">
          <AllTask data={tasks} />
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;