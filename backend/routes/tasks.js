const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getAnalytics,
} = require("../controllers/taskController");

router.use(auth);

router.get("/analytics", getAnalytics);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
