const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const UserRole = new mongoose.Schema({
  // _id: mongoose.Schema.ObjectId,
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
});

module.exports = mongoose.model('UserRole', UserRole);
