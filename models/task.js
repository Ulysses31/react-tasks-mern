const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const Task = mongoose.model(
  'Task',
  new mongoose.Schema({
    // _id: mongoose.Schema.ObjectId,
    taskName: {
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
    endDate: {
      type: Date
    },
    duration: {
      type: Number,
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State'
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Priority'
    },
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTask'
      }
    ],
    createdAt: {
      type: Date,
      required: true,
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

module.exports = Task;
