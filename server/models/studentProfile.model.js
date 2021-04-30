const mongoose = require('mongoose');
const validator = require('validator');

var profileSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    }
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Phone number is invalid");
      }
    }
  },
  gender: {
    type: String,
    uppercase: true,
    enum: ['MALE', 'FEMALE', 'OTHERS'],
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
  }
});

const sProfile = mongoose.model('studentprofile', profileSchema);
module.exports = sProfile;