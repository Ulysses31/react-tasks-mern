const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const UserRole = mongoose.model(
  'UserRole',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sign: {
      type: String,
      required: true,
      maxlength: 10
    },
    role: {
      type: String,
      required: true,
      maxlength: 100
    },
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedAt: {
      type: Date
    },
    updatedBy: {
      type: String
    },
    guid: {
      type: String,
      required: true,
      default: uuidv4()
    }
  })
);

module.exports = UserRole;
