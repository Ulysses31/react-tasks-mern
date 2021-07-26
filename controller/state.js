const State = require('../models/state');

exports.getStateList = async (req, res) => {
  console.log('getStateList executed...');
  try {
    const states = await State.find();
    return res.json(states);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getStateById = async (req, res) => {
  console.log(`getStateById executed...
    Param: ${req.params.id}`);
  try {
    const state = await State.find({
      _id: req.params.id
    });
    return res.json(state);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.insertState = async (req, res) => {
  console.log('insertState executed...');
  try {
    const cmn = new State(req.body);
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

exports.updateState = async (req, res) => {
  console.log('updateState called...');
  try {
    const result = await State.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `State ${req.params.id} updated = ${result.nModified}`
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

exports.deleteState = async (req, res) => {
  console.log('deleteState called...');
  try {
    const result = await State.deleteOne({
      _id: req.params.id
    });
    console.log(
      `State ${req.params.id} deleted = ${result.deletedCount}`
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
