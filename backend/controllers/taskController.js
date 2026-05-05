const Task = require("../models/taskModel");


// ========================
// CREATE TASK (ADMIN ONLY)
// ========================
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      status: "new"
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ========================
// GET ALL TASKS
// ========================
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email role");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ========================
// UPDATE TASK (status change)
// ========================
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ========================
// ASSIGN TASK TO EMPLOYEE
// ========================
exports.assignTask = async (req, res) => {
  try {
    const { userId } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: userId,
        status: "new"
      },
      { new: true }
    ).populate("assignedTo", "name email role");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};