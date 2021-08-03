const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase:true
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
    date: {
        type: Date,
        required: true
    },
    questions: {
        type: Number,
        required: true
    },
    MperQ: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    Tmarks: {
        type: Number,
        required: true
    },
    timelimit: {
        type: Number,
        required: true
    },
    testname: {
        type: String,
        required: true,
        uppercase:true
    },
    Createdby: {
        type: String,
        required: true,
    },
    set:{
        type: Boolean,
        default: false
      }
});

const paper = mongoose.model('paper', paperSchema, 'Paperinfo');
module.exports = paper;
