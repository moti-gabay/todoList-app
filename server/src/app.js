const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", tasksRouter);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
