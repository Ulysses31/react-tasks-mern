const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ComputeDuration = mongoose.model(
  'ComputeDuration',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
      required: true,
      default: Date.now
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
      required: true,
      default: uuidv4()
    }
  })
);

module.exports = ComputeDuration;
