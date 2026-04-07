const fs = require("fs");
const path = require("path");

const TASKS_FILE = path.join(__dirname, "../../data/tasks.json");
const USERS_FILE = path.join(__dirname, "../../data/users.json");

function readTasks() {
  const raw = fs.readFileSync(TASKS_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

function readUsers() {
  const raw = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

module.exports = { readTasks, writeTasks, readUsers, writeUsers };
