//declarations
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

//imports
const ctrlStudent = require('../controller/student.controller');
const ctrlAdmin = require('../controller/admin.controller');
const ctrlPaper = require('../controller/paper.controller');

//api/student
router.post('/register', ctrlStudent.register);
router.post('/login', ctrlStudent.login);
router.post('/profile', ctrlStudent.profile);
router.get('/getProfile/:id', ctrlStudent.getProfile);
router.get('/getStudent/:user', ctrlStudent.getStudent);

//api/student/test
router.post('/addmarks', ctrlStudent.addmarks);
router.get('/tests/:year/:branch', ctrlStudent.tests);
router.get('/QuestionPaper/:testname', ctrlStudent.QuestionPaper);
router.get('/getmarks/:id2', ctrlStudent.getmarks);

//api/admin
router.post('/adminregister', ctrlAdmin.adminregister);
router.post('/adminlogin', ctrlAdmin.adminlogin);
router.get('/getDetails/:clgID', ctrlAdmin.getdetail);

//api/admin/paper
router.post('/Createpaper', ctrlPaper.papers);
router.post('/addquestion', ctrlPaper.addquestions);
router.get('/getPaper/:id1', ctrlPaper.getPaper);
router.get('/paperCreatedby/:name', ctrlPaper.getPaperbyCreator);
router.get('/getQuestion/:testname', ctrlPaper.getQuestions);
router.get('/results/:testname', ctrlPaper.getResult)

module.exports = router;

