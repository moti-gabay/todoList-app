function validateTaskCreate(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({
      error: "Task title is required and must be at least 3 characters.",
    });
  }

  req.body.title = title.trim();
  next();
}

function validateTaskUpdate(req, res, next) {
  const { title, isCompleted } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim().length < 3) {
      return res.status(400).json({
        error: "Task title must be at least 3 characters.",
      });
    }
    req.body.title = title.trim();
  }

  if (isCompleted !== undefined) {
    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({
        error: "isCompleted must be a boolean.",
      });
    }
  }

  next();
}

module.exports = { validateTaskCreate, validateTaskUpdate };
