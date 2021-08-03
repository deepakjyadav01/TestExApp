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


