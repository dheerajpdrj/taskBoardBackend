const List = require("../models/list");

exports.getAllTasks = async (req, res) => {
  try {
    const alltasks = await List.findAll({ order: [["createdAt", "ASC"]] });
    res.json(alltasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.json({ message: "Internal server error" });
  }
};

exports.addTaskController = async (req, res) => {
  try {
    const { header, body } = req.body;
    const newList = await List.create({ header, body });
    res.json(newList);
  } catch (error) {
    console.error("Error adding task:", error);
    res.json({ message: "Internal server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { data } = req.body;
    console.log("id", data);
    const list = await List.findByPk(data.id);
    if (!list) {
      return res.status(404).json({ message: "Task not found" });
    }

    list.header = data.header;
    list.body = data.body;

    if (list.body.length === 0) {
      await list.destroy();
      return res.status(204).end();
    }

    await list.save();

    res.status(200).json(list);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeTaskController = async (req, res) => {
  try {
    const { id } = req.body;
    await List.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error("Error removing task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
