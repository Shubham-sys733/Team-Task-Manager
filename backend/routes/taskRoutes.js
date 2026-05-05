const express = require("express");
const router = express.Router();


const {
  createTask,
  getTasks,
  updateTask,
  assignTask
} = require("../controllers/taskController");

const auth = require("../middlewares/authMiddleware");

// CREATE TASK
router.post("/", auth, createTask);

// GET ALL TASKS
router.get("/", auth, getTasks);

// UPDATE TASK STATUS
router.put("/:id", auth, updateTask);

// ASSIGN TASK TO EMPLOYEE
router.put("/assign/:id", auth, assignTask);
router.put("/:id", updateTask);

module.exports = router;