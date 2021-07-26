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
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
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
  },
  task: [
    {
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
      duration: {
        type: Number,
        required: true
      },
      assignedTo: {
        type: String,
        required: true,
        maxlength: 100
      },
      isEnabled: {
        type: Boolean
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date
      },
      state: {
        type: String,
        required: true
      },
      priority: {
        type: String,
        required: true
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
      },
      comment: [
        {
          // _id: mongoose.Schema.ObjectId,
          description: {
            type: String,
            required: true,
            maxlength: 255
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
        }
      ],
      subtask: [
        {
          // _id: mongoose.Schema.ObjectId,
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
          duration: {
            type: Number
          },
          isEnabled: {
            type: Boolean
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
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Project', Project);
