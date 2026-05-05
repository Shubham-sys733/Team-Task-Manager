import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import TaskList from "../tasks/TaskList";
import { api } from "../services/api";

const EmployeeDashboard = ({ user, logout }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="h-screen w-full p-7 bg-[#1C1C1C] text-white">

      <Header user={user} logout={logout} />

      {/* ✅ FIXED */}
      <TaskList data={tasks} />

    </div>
  );
};

export default EmployeeDashboard;