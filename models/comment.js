const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
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
});

module.exports = mongoose.model('Comment', Comment);
