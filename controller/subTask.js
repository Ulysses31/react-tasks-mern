const SubTask = require('../models/subTask');

exports.getSubTaskList = async (req, res) => {
  console.log('getSubTaskList executed...');
  try {
    const subTasks = await SubTask.find();
    return res.json(subTasks);
  } catch (e) {
    console.log(e);
  }
};

exports.getSubTaskById = async (req, res) => {
  console.log(`getSubTaskById executed...
    Param: ${req.params.id}`);
  try {
    const subtask = await SubTask.find({
      _id: req.params.id
    });
    return res.json(subtask);
  } catch (e) {
    console.log(e);
  }
};

exports.insertSubTask = async (req, res) => {
  console.log('insertSubTask executed...');
  try {
    const subtask = new SubTask(req.body);
    const result = await subtask.save();
    return res.json({ result });
  } catch (e) {
    console.log(e);
  }
};

exports.updateSubTask = async (req, res) => {
  console.log('updateSubTask called...');
  try {
    const result = await SubTask.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `SubTask ${req.params.id} updated = ${result.nModified}`
    );
    return res.json({ nModified: result.nModified });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteSubTask = async (req, res) => {
  console.log('deleteSubTask called...');
  try {
    const result = await SubTask.deleteOne({
      _id: req.params.id
    });
    console.log(
      `SubTask ${req.params.id} deleted = ${result.deletedCount}`
    );
    return res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    console.log(e);
  }
};
