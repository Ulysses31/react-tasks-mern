const mongoose = require('mongoose');
const Department = require('../models/department');

exports.getDepartmentList = async (req, res) => {
  console.log('getDepartmentList executed...');
  try {
    const departments = await Department.find().sort({
      name: 1
    });
    return res.json(departments);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.getDepartmentById = async (req, res) => {
  console.log(`getDepartmentById executed...
    Param: ${req.params.id}`);
  try {
    const department = await Department.find({
      _id: req.params.id
    });
    return res.json(department);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};

exports.insertDepartment = async (req, res) => {
  console.log('insertDepartment executed...');
  try {
    const cmn = new Department(req.body);
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

exports.updateDepartment = async (req, res) => {
  console.log('updateDepartment called...');
  try {
    req.body.updatedAt = new Date();

    const result = await Department.updateOne(
      { _id: req.params.id },
      req.body
    );
    console.log(
      `Department ${req.params.id} updated = ${result.nModified}`
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

exports.deleteDepartment = async (req, res) => {
  console.log('deleteDepartment called...');

  try {
    // find department in users
    const usrCnt = await Department.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $count: 'users'
      }
    ]);

    if (usrCnt.length > 0 && usrCnt[0].users > 0) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Delete failed. Department contains users'
      });
    }

    const result = await Department.deleteOne({
      _id: req.params.id
    });
    console.log(
      `Department ${req.params.id} deleted = ${result.deletedCount}`
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
