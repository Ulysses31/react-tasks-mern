const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const SubTask = mongoose.model(
  'SubTask',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subTaskName: {
      type: String,
      required: true,
      maxlength: 255
    },
    description: {
      type: String,
      required: true,
      maxlength: 255
    },
    startDate: {
      type: Date,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    computedDuration: {
      type: Number,
      required: true
    },
    durationUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComputeDuration'
    },
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
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
  })
);

module.exports = SubTask;
