const UserRole = require('../models/userRole');

exports.getUserRoleList = async (req, res) => {
  console.log('getUserRoleList executed...');
  try {
    const userRoles = await UserRole.find();
    return res.json(userRoles);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getUserRoleById = async (req, res) => {
  console.log(`getUserRoleById executed...
    Param: ${req.params.id}`);
  try {
    const userRole = await UserRole.find({
      _id: req.params.id
    });
    return res.json(userRole);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.insertUserRole = async (req, res) => {
  console.log('insertUserRole executed...');
  try {
    const cmn = new UserRole(req.body);
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

exports.updateUserRole = async (req, res) => {
  console.log('updateUserRole called...');
  try {
    const result = await UserRole.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `UserRole ${req.params.id} updated = ${result.nModified}`
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

exports.deleteUserRole = async (req, res) => {
  console.log('deleteUserRole called...');
  try {
    const result = await UserRole.deleteOne({
      _id: req.params.id
    });
    console.log(
      `UserRole ${req.params.id} deleted = ${result.deletedCount}`
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
