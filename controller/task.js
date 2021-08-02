const Task = require('../models/task');
const Project = require('../models/project');

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

exports.getTaskByUser = async (req, res) => {
  console.log(`getTaskByUser executed...
  Param: ${req.params.user}`);

  const dataFrom = req.params.dateFrom;
  const dataTo = req.params.dateTo;

  try {
    const tsk = await Project.find({
      $and: [
        {
          'task.startDate': {
            $gte: new Date(dataFrom),
            $lte: new Date(dataTo)
          },
          'task.isEnabled': true,
          'task.assignedTo': `${req.params.user}`,
          isEnabled: true
        }
      ]
    });
    return res.json(tsk);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
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
