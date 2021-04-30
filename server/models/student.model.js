const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: [6,'password should exceed than 6 characters'],
    maxlength:15
    },
  cnfpass: {
    type: String,
    required: true,
    minLength: [6,'password should exceed than 6 characters'],
    maxlength:15
  }
});

studentSchema.pre("save", async function (next) {
      
    this.password = await bcrypt.hash(this.password,10);
    this.cnfpass = undefined;
    next();
});

const StudentUser = mongoose.model('StudentUser', studentSchema);
module.exports = StudentUser;

