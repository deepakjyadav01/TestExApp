const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['FE', 'SE', 'TE', 'BE']
  },
  branch: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['ELEC', 'EXTC', 'IT', 'CMPN']
  },
  class: {
    type: String,
    required: true,
    uppercase: true,
    enum: ['I', 'II']
  },
  rollno: {
    type: Number,
    required: true,
    min: 1,
    max: 150
  },
  testname: {
    type: String,
    required: true
  },
  Omarks: {
    type: Number,
    required: true
  },
  Tmarks: {
    type: Number,
    required: true
  },
  submitted: {
    type: Boolean,
    default: false
  },
});

const marks = mongoose.model('StudentMarks', markSchema, 'StudentMarks');
module.exports = marks;
