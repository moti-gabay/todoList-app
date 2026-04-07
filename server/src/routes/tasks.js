const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { readTasks, writeTasks } = require("../utils/fileUtils");
const { validateTaskCreate, validateTaskUpdate } = require("../middleware/validateTask");

const router = express.Router();

// GET /api/tasks — retrieve all tasks
router.get("/", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST /api/tasks — create a new task
router.post("/", validateTaskCreate, (req, res) => {
  const { title } = req.body;
  const tasks = readTasks();

  const newTask = {
    id: uuidv4(),
    title,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// PATCH /api/tasks/:id — update a task (title or isCompleted)
router.patch("/:id", validateTaskUpdate, (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

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
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);
  writeTasks(tasks);

  res.json(deletedTask);
});

module.exports = router;
