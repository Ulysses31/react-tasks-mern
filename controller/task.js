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
  let prj = null;

  try {
    if (req.params.user === '0') {
      prj = await Project.aggregate([
        {
          $lookup: {
            from: 'tasks',
            localField: 'tasks',
            foreignField: '_id',
            as: 'tasks'
          }
        },
        {
          $match: {
            isEnabled: true,
            createdAt: {
              $gte: new Date(
                `${dataFrom[1]}-${dataFrom[0]}-01`
              ),
              $lte: new Date(`${dataTo[1]}-${dataTo[0]}-31`)
            }
          }
        },
        {
          $unwind: {
            path: '$tasks',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $match: {
            'tasks.isEnabled': true
          }
        },
        {
          $project: {
            tasks: 0
          }
        },
        {
          $group: {
            _id: null,
            projects: {
              $addToSet: {
                _id: '$_id',
                projectName: '$projectName',
                description: '$description',
                computedDuration: '$computedDuration',
                durationUnit: '$durationUnit',
                duration: '$duration',
                deadline: '$deadline',
                priority: '$priority',
                state: '$state',
                createdAt: '$createdAt'
              }
            }
          }
        },
        {
          $sort: {
            createdAt: 1,
            projectName: 1
          }
        }
      ]);
    } else {
      prj = await Project.aggregate([
        {
          $lookup: {
            from: 'tasks',
            localField: 'tasks',
            foreignField: '_id',
            as: 'tasks'
          }
        },
        {
          $match: {
            isEnabled: true,
            createdAt: {
              $gte: new Date(
                `${dataFrom[1]}-${dataFrom[0]}-01`
              ),
              $lte: new Date(`${dataTo[1]}-${dataTo[0]}-31`)
            }
          }
        },
        {
          $unwind: {
            path: '$tasks',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $match: {
            'tasks.isEnabled': true,
            'tasks.assignedTo': mongoose.Types.ObjectId(
              `${req.params.user}`
            )
          }
        },
        {
          $project: {
            tasks: 0
          }
        },
        {
          $group: {
            _id: null,
            projects: {
              $addToSet: {
                _id: '$_id',
                projectName: '$projectName',
                description: '$description',
                computedDuration: '$computedDuration',
                durationUnit: '$durationUnit',
                duration: '$duration',
                deadline: '$deadline',
                priority: '$priority',
                state: '$state',
                createdAt: '$createdAt'
              }
            }
          }
        },
        {
          $sort: {
            createdAt: 1,
            projectName: 1
          }
        }
      ]);
    }

    console.log(prj);
    return res.json(prj.length > 0 ? prj[0].projects : []);
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
    const task = await Task.findOne({
      _id: req.params.id
    })
      .populate('project')
      .populate('assignedTo')
      .populate('state')
      .populate('priority')
      .populate('durationUnit')
      .populate({
        path: 'subtasks'
      })
      .populate({
        path: 'comments',
        populate: [
          { path: 'user', populate: { path: 'department' } }
        ]
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
  let tsk = null;

  try {
    if (req.params.user === '0') {
      tsk = await Task.find({
        isEnabled: true,
        startDate: { $gte: dataFrom, $lte: dataTo }
      })
        .populate('state')
        .populate('priority')
        .populate('project')
        .populate('assignedTo')
        .sort({ createdAt: 1 });
    } else {
      tsk = await Task.find({
        isEnabled: true,
        assignedTo: mongoose.Types.ObjectId(
          req.params.user
        ),
        startDate: { $gte: dataFrom, $lte: dataTo }
      })
        .populate('state')
        .populate('priority')
        .populate('project')
        .populate('assignedTo')
        .sort({ createdAt: 1 });
    }

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
    req.body._id = null;

    const task = new Task(req.body);
    const tskResult = await task.save();
    const indx = await Task.findOne({ guid: task.guid });

    const result = await Project.updateOne(
      {
        _id: req.body.project
      },
      {
        $push: { tasks: indx._id }
      },
      { new: true, useFindAndModify: false }
    );

    return res.json({ tskResult, result });
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
    req.body.updatedAt = new Date();

    const updateTask = await Task.updateOne(
      { _id: req.params.id },
      req.body
    );

    // clear projects
    const projectClearResult = await Project.updateOne(
      {
        tasks: req.params.id
      },
      {
        $pullAll: {
          tasks: [req.params.id]
        }
      },
      {
        new: false,
        useFindAndModify: false
      }
    );

    // update project
    const projectUpdateResult =
      await Project.findByIdAndUpdate(
        {
          _id: req.body.project._id
            ? req.body.project._id
            : req.body.project
        },
        {
          $push: {
            tasks: [req.body._id]
          }
        },
        {
          new: true,
          useFindAndModify: false
        }
      );

    console.log(`Task ${req.params.id} updated`);
    return res.json({
      updateTask,
      projectClearResult,
      projectUpdateResult
    });
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
    // find task
    const tsk = await Task.findOne({
      _id: mongoose.Types.ObjectId(req.params.id)
    });

    // count comments
    const cmntCnt = await Task.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $count: 'comments'
      }
    ]);

    if (cmntCnt.length > 0 && cmntCnt[0].comments > 0) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Delete aborted! Task contains comments'
      });
    }

    // count subtasks
    const subtaskCnt = await Task.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $unwind: {
          path: '$subtasks',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $count: 'subtasks'
      }
    ]);

    if (
      subtaskCnt.length > 0 &&
      subtaskCnt[0].subtasks > 0
    ) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Delete aborted! Task contains sub tasks'
      });
    }

    const result = await Task.deleteOne({
      _id: req.params.id
    });

    // update project tasks
    const prj = await Project.updateOne(
      {
        _id: mongoose.Types.ObjectId(tsk.project)
      },
      {
        $pullAll: {
          tasks: [req.params.id]
        }
      },
      {
        new: false,
        useFindAndModify: false
      }
    );

    console.log(`Task ${req.params.id} deleted`);
    return res.json({ result, prj });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};
