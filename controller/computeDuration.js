const ComputeDuration = require('../models/computeDuration');

exports.getComputeddurationList = async (req, res) => {
  console.log('getComputeddurationList executed...');
  try {
    const durations = await ComputeDuration.find();
    console.log(durations);
    return res.json(durations);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getComputeddurationById = async (req, res) => {
  console.log(`getComputeddurationById executed...
    Param: ${req.params.id}`);
  try {
    const duration = await ComputeDuration.findOne({
      _id: req.params.id
    });
    console.log(duration);
    return res.json(duration);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.insertComputedduration = async (req, res) => {
  console.log('insertComputedduration executed...');
  try {
    const cmp = new ComputeDuration(req.body);
    const result = await cmp.save();
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

exports.updateComputedduration = async (req, res) => {
  console.log('updateComputedduration called...');
  try {
    const result = await ComputeDuration.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `Computedduration ${req.params.id} updated = ${result.nModified}`
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

exports.deleteComputedduration = async (req, res) => {
  console.log('deleteComputedduration called...');
  try {
    const result = await ComputeDuration.deleteOne({
      _id: req.params.id
    });
    console.log(
      `Computedduration ${req.params.id} deleted = ${result.deletedCount}`
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
