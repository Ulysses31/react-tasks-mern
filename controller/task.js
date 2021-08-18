const mongoose = require('mongoose');
const Task = require('../models/task');
const Project = require('../models/project');

exports.getTaskList = async (req, res) => {
  console.log('getTaskList executed...');
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    return res.json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getProjectByUser = async (req, res) => {
  console.log(`getProjectByUser executed...
  Param: ${req.params.user}`);

  const dataFrom = `${req.params.curDateFrom}`.split('|');
  const dataTo = `${req.params.curDateTo}`.split('|');

  try {
    const prj = await Task.aggregate([
      {
        $lookup: {
          from: 'projects',
          localField: 'task.projectId',
          foreignField: 'project._id',
          as: 'project'
        }
      },
      {
        $match: {
          $and: [
            {
              isEnabled: true,
              assignedTo: mongoose.Types.ObjectId(
                `${req.params.user}`
              )
            }
          ]
        }
      },
      {
        $unwind: {
          path: '$project',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $match: {
          $and: [
            {
              'project.createdAt': {
                $gte: new Date(
                  `${dataFrom[1]}-${dataFrom[0]}-01`
                ),
                $lte: new Date(
                  `${dataTo[1]}-${dataTo[0]}-31`
                )
              },
              'project.isEnabled': true
            }
          ]
        }
      },
      {
        $group: {
          _id: null,
          projects: { $addToSet: '$project' }
        }
      },
      {
        $project: {
          _id: 0,
          projects: 1
        }
      }
    ]);
    console.log(prj);
    return res.json(prj[0].projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getActiveTasks = async (req, res) => {
  console.log('getActiveTasks executed...');
  try {
    const tasks = await Task.find({
      isEnabled: true
    }).count();
    return res.json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getTaskById = async (req, res) => {
  console.log(`getTaskById executed...
    Param: ${req.params.id}`);
  try {
    // const task = await Task.find({
    //   _id: req.params.id
    // });
    const task = await Project.findOne({
      'task._id': req.params.id
    });
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getTaskByUser = async (req, res) => {
  console.log(`getTaskByUser executed...
  Param: ${req.params.user}`);

  const dataFrom = req.params.dateFrom;
  const dataTo = req.params.dateTo;

  try {
    const tsk = await Task.find({
      isEnabled: true,
      assignedTo: mongoose.Types.ObjectId(req.params.user),
      startDate: { $gte: dataFrom, $lte: dataTo }
    })
      .populate('state')
      .populate('priority')
      .populate('project')
      .populate('assignedTo');

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

    const result = await Project.updateOne(
      {
        _id: req.body.projectId
      },
      {
        $set: {
          task: task
        }
      }
    );

    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
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
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};
