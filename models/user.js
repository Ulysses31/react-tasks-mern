const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const User = new mongoose.Schema({
  // _id: mongoose.Schema.ObjectId,
  username: {
    type: String,
    required: true,
    maxlength: 20
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    maxlength: 450
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  position: {
    type: String,
    required: true,
    maxlength: 100
  },
  role: {
    type: String,
    required: true,
    maxlength: 100
  },
  department: {
    type: String,
    required: true,
    maxlength: 100
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
});

module.exports = mongoose.model('User', User);
