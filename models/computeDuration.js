const mongoose = require('mongoose');

const ComputeDuration = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  code: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
  },
  factor: {
    type: Number,
    required: true,
    default: 0
  },
  isDefault: {
    type: Boolean,
    required: true,
    default: false
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
    type: Date,
    required: false
  },
  updatedBy: {
    type: String,
    required: false
  },
  guid: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model(
  'ComputeDuration',
  ComputeDuration
);
