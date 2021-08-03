//requires
require('../routes/route');
require('../models/paper.model');
require('../models/questions.model')
require('../models/marks.model');

//imports
const mongoose = require('mongoose');
const paper = require('../models/paper.model')
const question = require('../models/questions.model');
const marks = require('../models/marks.model')

module.exports.papers = async (req, res) => {
  try {
    const name = req.body.name
    const year = req.body.year;
    const branch = req.body.branch;
    const testname = year + "-" + branch + "-" + name;

    const questions = req.body.questions;
    const MperQ = req.body.MperQ;
    const Total = questions * MperQ;

    let data = new paper({
      name: name,
      year: year,
      branch: branch,
      class: req.body.class,
      date: req.body.date,
      questions: questions,
      MperQ: MperQ,
      Tmarks: Total,
      timelimit: req.body.timelimit,
      testname: testname,
      Createdby: req.body.Createdby
    })
    const reg = await data.save();
    res.status(201).json(reg);


  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports.addquestions = async (req, res) => {
  try {
    let data = new question({
      questionID: req.body.questionID,
      question: req.body.question,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      right: req.body.right,
      testname: req.body.testname
    });

    const reg = await data.save();
    res.status(201).json(reg);

  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports.getPaper = async (req, res) => {
  try {
    const detail = await paper.findOne({ collegeID: req.params.clgID });
    res.status(200).json(detail);

  } catch (error) {
    res.status(400).json(error);
  }
}
module.exports.fillset = async (req, res) => {
  try {
    const value = await paper.findOneAndUpdate({ testname: req.params.test }, {$set:{ set:"true"} },{new:true});
    res.status(200).json(value);
  } catch (error) {
    res.status(400).send("not set to true")
  }
}
module.exports.delPaper = async (req, res) => {
  try {
    const value = await paper.findOneAndDelete({ testname: req.params.testname });
    res.status(200).json(value);
  } catch (error) {
    res.status(400).send("not deleted")
  }
}
module.exports.delQ = async (req, res) => {
  try {
    const value = await question.deleteMany({ testname: req.params.testname });
    res.status(200).json(value);
  } catch (error) {
    res.status(400).send("not deleted")
  }
}

module.exports.getQuestions = async (req, res) => {
  try {
    const detail = await question.find({ testname: req.params.testname });
    res.status(200).json(detail);
    console.log(detail);

  } catch (error) {
    res.status(400).json(error);
  }
}
module.exports.getPaperbyCreator = async (req, res) => {
  try {
    const detail = await paper.find({ Createdby: req.params.name });
    res.status(200).json(detail);

  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports.getResult = async (req, res) => {
  try {
    const detail = await marks
      .find({ testname: req.params.testname })
      .sort({ Omarks: -1 })
    res.status(200).json(detail);

  } catch (error) {
    res.status(400).json(error);
  }
}

