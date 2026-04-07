const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { readTasks, writeTasks } = require("../utils/fileUtils");
const { validateTaskCreate, validateTaskUpdate } = require("../middleware/validateTask");
const authGuard = require("../middleware/authGuard");

const router = express.Router();

// All task routes require a valid JWT
router.use(authGuard);

// GET /api/tasks — retrieve all tasks for the logged-in user
router.get("/", (req, res) => {
  const tasks = readTasks();
  const userTasks = tasks.filter((task) => task.userId === req.userId);
  res.json(userTasks);
});

// POST /api/tasks — create a new task
router.post("/", validateTaskCreate, (req, res) => {
  const { title } = req.body;
  const tasks = readTasks();

  const newTask = {
    id: uuidv4(),
    userId: req.userId,
    title,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// PATCH /api/tasks/:id — update a task
router.patch("/:id", validateTaskUpdate, (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id && task.userId === req.userId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  const { title, isCompleted } = req.body;
  if (title !== undefined) tasks[taskIndex].title = title;
  if (isCompleted !== undefined) tasks[taskIndex].isCompleted = isCompleted;

  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id — delete a task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id && task.userId === req.userId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);
  writeTasks(tasks);

  res.json(deletedTask);
});

module.exports = router;
