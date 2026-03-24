const Task = require("../models/Task");

const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sortBy, order, page, limit } = req.query;

    const filter = { user: req.userId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const sortField = sortBy || "createdAt";
    const sortOrder = order === "asc" ? 1 : -1;

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNum - 1) * pageSize;

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(pageSize),
      Task.countDocuments(filter),
    ]);

    res.json({
      tasks,
      currentPage: pageNum,
      totalPages: Math.ceil(total / pageSize),
      totalTasks: total,
    });
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.userId,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.userId;

    const [total, completed, inProgress, todo] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, status: "Done" }),
      Task.countDocuments({ user: userId, status: "In Progress" }),
      Task.countDocuments({ user: userId, status: "Todo" }),
    ]);

    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.json({
      total,
      completed,
      inProgress,
      todo,
      completionPercentage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getAnalytics };
