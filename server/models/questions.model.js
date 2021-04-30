const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionID: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    right: {
        type: Number,
        required: true
    },
    testname: {
        type: String,
        required: true
    }
});

const question = mongoose.model('question', questionSchema, 'Questions');
module.exports = question;


const markSchema = new mongoose.Schema({
   fullname: {
        type : String,
        required: true,
        unique: true
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
     Omarks:{
         type:Number,
         required: true
     },
     Tmarks:{
        type:Number,
        required: true
     }
});

const marks = mongoose.model('StudentMarks', markSchema, 'StudentMarks');
module.exports = marks;
