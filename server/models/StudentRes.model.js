const mongoose = require('mongoose');
const validator = require('validator');

const responseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  detail:{ type: String,
    required: true
  },
  response:[{
    questionID: {
      type: Number,
      required: true
  }, rightans: {
    type: Number,
    required: true
},
  }],
  testname: {
    type: String,
    required: true
}

})

const response = mongoose.model('Response', responseSchema, 'Response');
module.exports = response;
