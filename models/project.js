const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const Project = new mongoose.Schema({
  // _id: mongoose.Schema.ObjectId,
  projectName: {
    type: String,
    required: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
  },
  duration: {
    type: Number,
    required: true
  },
  computedDuration: {
    type: Number,
    required: true
  },
  durationUnitId: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  },
  stateId: {
    type: String,
    required: true
  },
  priorityId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
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

module.exports = mongoose.model('Project', Project);
