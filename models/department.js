const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const Department = new mongoose.Schema({
  // _id: mongoose.Schema.ObjectId,
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
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
    type: Date,
    default: null
  },
  updatedBy: {
    type: String,
    default: null
  },
  guid: {
    type: String,
    required: true,
    default: uuidv4()
  }
});

module.exports = mongoose.model('Department', Department);
