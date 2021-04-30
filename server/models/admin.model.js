const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    collegeID: {
        type : String,
        required: true,
        unique: true
    },
    fullname: {
        type : String,
        required: true,
        unique: true
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

adminSchema.pre("save", async function (next) {
      
    this.password = await bcrypt.hash(this.password,10);
    this.cnfpass = undefined;
    next();
});

const AdminUser = mongoose.model('AdminUser', adminSchema);
module.exports = AdminUser;