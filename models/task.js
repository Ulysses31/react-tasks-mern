const mongoose = require('mongoose');

const Task = new mongoose.Schema({
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
    type: String,
    required: true,
    maxlength: 100
  },
  projectId: {
    type: String,
    required: true
  },
  stateId: {
    type: String,
    required: true
  },
  priorityId: {
    type: String,
    required: true
  },
  isEnabled: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date,
    required: true
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
    required: true
  },
  comment: [
    {
      _id: mongoose.Schema.ObjectId,
      description: {
        type: String,
        required: true,
        maxlength: 255
      },
      createdAt: {
        type: Date,
        required: true
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
        required: true
      }
    }
  ],
  subtask: [
    {
      _id: mongoose.Schema.ObjectId,
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
      createdAt: {
        type: Date,
        required: true
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
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Task', Task);
