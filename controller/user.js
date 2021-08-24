const mongoose = require('mongoose');
const User = require('../models/user');
const Department = require('../models/department');
const UserRole = require('../models/userRole');

exports.getUserList = async (req, res) => {
  console.log('getUserList executed...');
  try {
    const users = await User.find()
      .populate('department')
      .populate('role')
      .sort({ createdAt: 1 });
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
    }).populate('department');
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

    if (!user) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Server Error',
        message: 'Invalid Credentials'
      });
    }

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
    req.body._id = null;

    const usr = new User(req.body);
    const usrResult = await usr.save();
    const indx = await User.findOne({ guid: usr.guid });

    // assign department
    const depResult = await Department.findByIdAndUpdate(
      req.body.department,
      {
        $push: { users: indx._id }
      },
      { new: true, useFindAndModify: false }
    );

    // assign role
    const roleResult = await UserRole.findByIdAndUpdate(
      req.body.role,
      {
        $push: { users: indx._id }
      },
      { new: true, useFindAndModify: false }
    );

    return res.json({
      userResult: usrResult,
      departmentResult: depResult,
      roleResult: roleResult
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

exports.updateUser = async (req, res) => {
  console.log('updateUser called...');
  try {
    req.body.updatedAt = new Date();

    // update user
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      req.body
    );

    // clear user role
    const userRoleClearResult = await UserRole.updateOne(
      {
        users: req.params.id
      },
      {
        $pullAll: {
          users: [req.params.id]
        }
      },
      {
        new: false,
        useFindAndModify: false
      }
    );

    // clear department
    const departmentClearResult =
      await Department.updateOne(
        {
          users: req.params.id
        },
        {
          $pullAll: {
            users: [req.params.id]
          }
        },
        {
          new: false,
          useFindAndModify: false
        }
      );

    // update new user role
    const userRoleUpdateResult =
      await UserRole.findByIdAndUpdate(
        { _id: req.body.role._id },
        {
          $push: {
            users: [req.body._id]
          }
        },
        {
          new: true,
          useFindAndModify: false
        }
      );

    // update department
    const departmentUpdateResult =
      await Department.findByIdAndUpdate(
        {
          _id:
            req.body.department._id === undefined
              ? req.body.department
              : req.body.department._id
        },
        {
          $push: {
            users: [req.body._id]
          }
        },
        {
          new: true,
          useFindAndModify: false
        }
      );

    console.log(`User ${req.params.id} updated`);
    return res.json({
      updatedUser,
      userRoleClearResult,
      departmentClearResult,
      userRoleUpdateResult,
      departmentUpdateResult
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

exports.deleteUser = async (req, res) => {
  console.log('deleteUser called...');

  try {
    // find comments
    const cmnCnt = await User.aggregate([
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

    if (cmnCnt.length > 0 && cmnCnt[0].comments > 0) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Delete failed. User contains comments'
      });
    }

    // find tasks
    const tskCnt = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $unwind: {
          path: '$tasks',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $count: 'tasks'
      }
    ]);

    if (tskCnt.length > 0 && tskCnt[0].tasks > 0) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Delete failed. User contains tasks'
      });
    }

    const result = await User.deleteOne({
      _id: req.params.id
    });

    // delete user from department
    const dep = await Department.updateOne(
      {
        _id: sbtsk.department
      },
      {
        $pullAll: {
          users: [req.params.id]
        }
      },
      {
        new: false,
        useFindAndModify: false
      }
    );

    console.log(`User ${req.params.id} deleted`);
    return res.json({ result, dep });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      message: err
    });
  }
};
