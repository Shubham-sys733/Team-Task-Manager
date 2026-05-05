import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🔥 SAFE RESPONSE HANDLING
        setTasks(res.data.tasks || res.data || []);
      } catch (err) {
        console.log("Error fetching tasks:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-700 p-4 rounded text-white mt-4">

      <h2 className="text-xl font-bold mb-3">All Tasks</h2>

      {loading ? (
        <p className="text-gray-300">Loading tasks...</p>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="p-2 border-b border-gray-500">

            <p><b>Title:</b> {task.title}</p>
            <p><b>Description:</b> {task.description}</p>
            <p><b>Status:</b> {task.status}</p>
            <p><b>Category:</b> {task.category}</p>

          </div>
        ))
      ) : (
        <p className="text-gray-300">No tasks available</p>
      )}

    </div>
  );
};

export default AllTask;