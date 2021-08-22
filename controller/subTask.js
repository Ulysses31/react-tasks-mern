const mongoose = require('mongoose');
const SubTask = require('../models/subTask');
const Task = require('../models/task');

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
    req.body._id = null;

    const sbtsk = new SubTask(req.body);
    const subTaskResult = await sbtsk.save();
    const indx = await SubTask.findOne({
      guid: req.body.guid
    });

    // update task
    const result = await Task.updateOne(
      {
        _id: req.body.task
      },
      {
        $push: { subtasks: indx._id }
      },
      { new: true, useFindAndModify: false }
    );

    // count durations
    const cnt = await Task.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.task)
        }
      },
      {
        $lookup: {
          from: 'subtasks',
          localField: 'subtasks',
          foreignField: '_id',
          as: 'subtasks'
        }
      },
      {
        $project: {
          total: {
            $sum: '$subtasks.computedDuration'
          }
        }
      }
    ]);

    // update task total duration
    const totalResult = await Task.updateOne(
      {
        _id: req.body.task
      },
      {
        $set: { duration: cnt[0].total }
      },
      { new: true, useFindAndModify: false }
    );

    return res.json({ subTaskResult, result, totalResult });
  } catch (e) {
    console.log(e);
  }
};

exports.updateSubTask = async (req, res) => {
  console.log('updateSubTask called...');
  try {
    req.body.updatedAt = new Date();

    const sbtsk = await SubTask.updateOne(
      { _id: req.params.id },
      req.body
    );

    // count durations
    const cnt = await Task.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.task)
        }
      },
      {
        $lookup: {
          from: 'subtasks',
          localField: 'subtasks',
          foreignField: '_id',
          as: 'subtasks'
        }
      },
      {
        $project: {
          total: {
            $sum: '$subtasks.computedDuration'
          }
        }
      }
    ]);

    // update task total duration
    const totalResult = await Task.updateOne(
      {
        _id: req.body.task
      },
      {
        $set: { duration: cnt[0].total }
      },
      { new: true, useFindAndModify: false }
    );

    console.log(`SubTask ${req.params.id}`);
    return res.json({ sbtsk, cnt, totalResult });
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
