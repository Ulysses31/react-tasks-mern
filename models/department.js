const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const Department = mongoose.model(
  'Department',
  new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      maxlength: 100
    },
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
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = Department;
