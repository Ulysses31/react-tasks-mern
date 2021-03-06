const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const State = mongoose.model(
  'State',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sign: {
      type: String,
      required: true,
      maxlength: 10
    },
    stateName: {
      type: String,
      required: true,
      maxlength: 100
    },
    sort: {
      type: Number,
      required: true
    },
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
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

module.exports = State;
