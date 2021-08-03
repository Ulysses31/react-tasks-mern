const User = require('../models/user');

exports.getUserList = async (req, res) => {
  console.log('getUserList executed...');
  try {
    const users = await User.find().sort({ createdAt: 1 });
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getUserById = async (req, res) => {
  console.log(`getUserById executed...
    Param: ${req.params.id}`);
  try {
    const user = await User.find({
      _id: req.params.id
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getUserByLogin = async (req, res) => {
  console.log(`getUserById executed...
    Params: ${req.body.email} - ${req.body.password}`);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.insertUser = async (req, res) => {
  console.log('insertUser executed...');
  try {
    const cmn = new User(req.body);
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

exports.updateUser = async (req, res) => {
  console.log('updateUser called...');
  try {
    const result = await User.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `User ${req.params.id} updated = ${result.nModified}`
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

exports.deleteUser = async (req, res) => {
  console.log('deleteUser called...');
  try {
    const result = await User.deleteOne({
      _id: req.params.id
    });
    console.log(
      `User ${req.params.id} deleted = ${result.deletedCount}`
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
