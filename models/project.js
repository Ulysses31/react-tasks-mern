const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const Project = mongoose.model(
  'Project',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    durationUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComputeDuration'
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
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State'
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Priority'
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    ],
    createdAt: {
      type: Date,
      required: false,
      default: new Date()
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

module.exports = Project;
