const express = require("express");
const Task = require("../models/Task");
const { validateTaskCreate, validateTaskUpdate } = require("../middleware/validateTask");
const authGuard = require("../middleware/authGuard");

const router = express.Router();

router.use(authGuard);

// GET /api/tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks
router.post("/", validateTaskCreate, async (req, res) => {
  const task = await Task.create({ userId: req.userId, title: req.body.title });
  res.status(201).json(task);
});

// PATCH /api/tasks/:id
router.patch("/:id", validateTaskUpdate, async (req, res) => {
  const { title, isCompleted } = req.body;
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (isCompleted !== undefined) updates.isCompleted = isCompleted;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    updates,
    { returnDocument: "after" }
  );

  if (!task) return res.status(404).json({ error: "Task not found." });
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!task) return res.status(404).json({ error: "Task not found." });
  res.json(task);
});

module.exports = router;
