const express = require("express");
const {
  addTaskController,
  getAllTasks,
  updateTask,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/gettasks", getAllTasks);
router.post("/addtask", addTaskController);
router.post("/update-task", updateTask);

module.exports = router;
