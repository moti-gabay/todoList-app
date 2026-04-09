const fs = require("fs");
const path = require("path");

const TASKS_FILE = path.join(__dirname, "../../data/tasks.json");
const USERS_FILE = path.join(__dirname, "../../data/users.json");

function ensureFile(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]", "utf-8");
}

function readTasks() {
  ensureFile(TASKS_FILE);
  const raw = fs.readFileSync(TASKS_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeTasks(tasks) {
  ensureFile(TASKS_FILE);
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

function readUsers() {
  ensureFile(USERS_FILE);
  const raw = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeUsers(users) {
  ensureFile(USERS_FILE);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

module.exports = { readTasks, writeTasks, readUsers, writeUsers };
