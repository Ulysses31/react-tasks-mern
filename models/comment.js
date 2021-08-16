const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const Comment = mongoose.model(
  'Comment',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
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

module.exports = Comment;
