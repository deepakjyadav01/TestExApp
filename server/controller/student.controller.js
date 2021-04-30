//requires
require('../routes/route');
require('../models/student.model');
require('../models/paper.model');
require('../models/questions.model')


//imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const StudentUser = require('../models/student.model');
const sProfile = require('../models/studentProfile.model');
const paper = require('../models/paper.model')
const question = require('../models/questions.model');
const marks = require('../models/questions.model');
const validator = require('validator');


module.exports.register = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cnfpass;

    if (password === cpassword) {
      let data = new StudentUser({
        username: req.body.username,
        password: password,
        cnfpass: cpassword
      })

      const registered = await data.save();
      res.status(201).json(registered);

    } else {
      res.status(400).send("passwords not matching");
    }
  } catch (error) {
    res.status(400).send("inside student");
  }
}

module.exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await StudentUser.findOne({ username: username });
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).send("login successfull");
    } else {
      res.status(400).send("please enter valid user details and try again");
    }
  } catch (error) {
    res.status(400).send("invalid username")
  }
}

module.exports.getStudent = async (req, res) => {
  try {
    const detail = await StudentUser.findOne({ username: req.params.user });
    res.status(200).send("new User Created " + detail.username);

  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports.profile = async (req, res) => {
  try {
    let data = new sProfile({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      year: req.body.year,
      branch: req.body.branch,
      class: req.body.class,
      rollno: req.body.rollno
    })

    const profile = await data.save();
    res.status(201).json(profile);
    console.log(profile._id);

  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports.getProfile = async (req, res) => {
  try {
    const detail = await sProfile.findById({ _id: req.params.id });
    res.status(200).json(detail);

  } catch (error) {
    res.status(400).json(error);
  }
}


module.exports.tests = async (req, res) => {
  try {
    const detail = await paper.find({
      $and: [
        { year: req.params.year },
        { branch: req.params.branch }
      ]
    });
    if (detail.length == 0) {
      res.status(400).send("not found");
    }
    else {
      res.status(200).json(detail);
    }
  } catch (error) {
    res.status(400).json(error);
  }

}

module.exports.QuestionPaper = async (req, res) => {
  try {
    const detail = await question.find({ testname: req.params.testname })
    res.status(200).json(detail);

  } catch (error) {
    res.status(400).json(error);
  }

}

module.exports.addmarks = async (req, res) => {
  try {
    let data = new marks({
      fullname: req.body.fullname,
      year: req.body.year,
      branch: req.body.branch,
      class: req.body.class,
      rollno: req.body.rollno,
      testname: req.body.testname,
      Omarks: req.body.Omarks,
      Tmarks: req.body.Tmarks
    })

    const profile = await data.save();
    res.status(201).json(profile);

  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports.getmarks = async (req, res) => {
  try {
    const detail = await marks.findById({ _id: req.params.id2 });
    res.status(200).json(detail);

  } catch (error) {
    res.status(400).json(error);
  }
}