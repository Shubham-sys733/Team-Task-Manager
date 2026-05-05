import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    assignedTo: ""
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET EMPLOYEES
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/employees");
        setEmployees(res.data);
      } catch (err) {
        console.log("Employee fetch error:", err.response?.data || err.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // ✅ FIXED API ENDPOINT (IMPORTANT)
      await axios.post("http://localhost:5000/api/tasks", task);

      alert("Task created successfully");

      setTask({
        title: "",
        description: "",
        category: "",
        date: "",
        assignedTo: ""
      });

    } catch (err) {
      console.log("Task Create Error:", err.response?.data || err.message);
      alert("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded text-white mt-4">

      <h2 className="text-xl font-semibold mb-3">Create Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="p-2 rounded text-black"
          required
        />

        <input
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="p-2 rounded text-black"
          required
        />

        <input
          name="category"
          value={task.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 rounded text-black"
          required
        />

        <input
          type="date"
          name="date"
          value={task.date}
          onChange={handleChange}
          className="p-2 rounded text-black"
          required
        />

        {/* ASSIGN EMPLOYEE */}
        <select
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          className="p-2 rounded text-black"
          required
        >
          <option value="">Assign Employee</option>

          {employees.length > 0 ? (
            employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))
          ) : (
            <option disabled>No employees found</option>
          )}

        </select>

        <button
          disabled={loading}
          className="bg-green-500 p-2 rounded hover:bg-green-600"
        >
          {loading ? "Creating..." : "Create Task"}
        </button>

      </form>

    </div>
  );
};

export default CreateTask;