const Priority = require('../models/priority');

exports.getPriorityList = async (req, res) => {
  console.log('getPriorityList executed...');
  try {
    const priorities = await Priority.find();
    return res.json(priorities);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getPriorityById = async (req, res) => {
  console.log(`getPriorityById executed...
    Param: ${req.params.id}`);
  try {
    const priority = await Priority.find({
      _id: req.params.id
    });
    return res.json(priority);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.insertPriority = async (req, res) => {
  console.log('insertPriority executed...');
  try {
    const cmn = new Priority(req.body);
    const result = await cmn.save();
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

exports.updatePriority = async (req, res) => {
  console.log('updatePriority called...');
  try {
    const result = await Priority.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `Priority ${req.params.id} updated = ${result.nModified}`
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

exports.deletePriority = async (req, res) => {
  console.log('deletePriority called...');
  try {
    const result = await Priority.deleteOne({
      _id: req.params.id
    });
    console.log(
      `Priority ${req.params.id} deleted = ${result.deletedCount}`
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
