const Project = require('../models/project');

exports.getProjectList = async (req, res) => {
  console.log('getProjectList executed...');
  try {
    const prj = await Project.find();
    return res.json(prj);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getProjectById = async (req, res) => {
  console.log(`getProjectById executed...
  Param: ${req.params.id}`);
  try {
    const prj = await Project.find({
      _id: req.params.id
    });
    return res.json(prj);
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
    const prj = await Project.find({
      $and: [
        {
          createdAt: {
            $gte: new Date(
              `${dataFrom[1]}-${dataFrom[0]}-01`
            ),
            $lte: new Date(`${dataTo[1]}-${dataTo[0]}-31`)
          },
          'task.isEnabled': true,
          'task.assignedTo': `${req.params.user}`,
          isEnabled: true
        }
      ]
    });
    return res.json(prj);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.insertProject = async (req, res) => {
  console.log('insertProject executed...');
  try {
    const prj = new Project(req.body);
    const result = await prj.save();
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

exports.updateProject = async (req, res) => {
  console.log('updateProject called...');
  try {
    const result = await Project.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `Project ${req.params.id} updated = ${result.nModified}`
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

exports.deleteProject = async (req, res) => {
  console.log('deleteProject called...');
  try {
    const result = await Project.deleteOne({
      _id: req.params.id
    });
    console.log(
      `Project ${req.params.id} deleted = ${result.deletedCount}`
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
