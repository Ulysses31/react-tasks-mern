const Task = require('../models/task');

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
          localField: 'projectId',
          foreignField: '_id',
          as: 'project'
        }
      },
      {
        $match: {
          $and: [
            {
              createdAt: {
                $gte: new Date(
                  `${dataFrom[1]}-${dataFrom[0]}-01`
                ),
                $lte: new Date(
                  `${dataTo[1]}-${dataTo[0]}-31`
                )
              },
              isEnabled: true,
              assignedTo: `${req.params.user}`
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
    console.log(prj[0].projects);
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
      { $sort: { 'task.createdAt': -1 } },
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
