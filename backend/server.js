const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// ✅ Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API Running Successfully 🚀",
    status: "OK"
  });
});

// ❌ 404 Handler (IMPORTANT)
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found ❌"
  });
});

// ❌ Global Error Handler (BEST PRACTICE)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong ❌"
  });
});

// ✅ DB + Server Start together (BEST WAY)
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err);
  });