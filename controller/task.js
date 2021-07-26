const Task = require('../models/task');

exports.getTaskList = async (req, res) => {
  console.log('getTaskList executed...');
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (e) {
    console.log(e);
  }
};

exports.getTaskById = async (req, res) => {
  console.log(`getTaskById executed...
    Param: ${req.params.id}`);
  try {
    const task = await Task.find({
      _id: req.params.id
    });
    return res.json(task);
  } catch (e) {
    console.log(e);
  }
};

exports.insertTask = async (req, res) => {
  console.log('insertTask executed...');
  try {
    const task = new Task(req.body);
    const result = await task.save();
    return res.json({ result });
  } catch (e) {
    console.log(e);
  }
};

exports.updateTask = async (req, res) => {
  console.log('updateTask called...');
  try {
    const result = await Task.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `Task ${req.params.id} updated = ${result.nModified}`
    );
    return res.json({ nModified: result.nModified });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteTask = async (req, res) => {
  console.log('deleteTask called...');
  try {
    const result = await Task.deleteOne({
      _id: req.params.id
    });
    console.log(
      `Task ${req.params.id} deleted = ${result.deletedCount}`
    );
    return res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    console.log(e);
  }
};
