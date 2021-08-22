const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
      maxlength: 250
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
    telephone: {
      type: String,
      required: false,
      maxlength: 15
    },
    mobile: {
      type: String,
      required: false,
      maxlength: 15
    },
    internalPhone: {
      type: String,
      required: false,
      maxlength: 10
    },
    isEnabled: {
      type: Boolean,
      required: true,
      default: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole'
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department'
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
      }
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
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
      type: Date,
      default: null
    },
    updatedBy: {
      type: String,
      default: null
    },
    guid: {
      type: String,
      required: true,
      default: uuidv4()
    }
  })
);

module.exports = User;
