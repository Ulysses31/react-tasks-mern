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
    const tsk = await Project.aggregate([
      { $match: { isEnabled: true } },
      { $unwind: '$task' },
      {
        $match: {
          'task.assignedTo': `${req.params.user}`,
          'task.isEnabled': true,
          'task.startDate': {
            $gte: new Date(dataFrom),
            $lte: new Date(dataTo)
          }
        }
      },
      {
        $project: {
          projectName: 1,
          'task._id': 1,
          'task.guid': 1,
          'task.taskName': 1,
          'task.description': 1,
          'task.duration': 1,
          'task.assignedTo': 1,
          'task.isEnabled': 1,
          'task.startDate': 1,
          'task.endDate': 1,
          'task.state': 1,
          'task.priority': 1,
          'task.createdBy': 1,
          'task.updatedAt': 1,
          'task.updatedBy': 1
        }
      }
    ]);
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
