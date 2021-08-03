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
router.put('/set/:user' ,ctrlStudent.setboolean);
router.put('/set/:user/:ID' ,ctrlStudent.setprofileID);


//api/student/test
router.post('/addmarks', ctrlStudent.addmarks);
router.post('/addresponse', ctrlStudent.addresponse);
router.get('/tests/:year/:branch', ctrlStudent.tests);
router.get('/QuestionPaper/:testname', ctrlStudent.QuestionPaper);
router.get('/getmarks/:name', ctrlStudent.getmarks);
router.get('/getmarks/:name/:testname', ctrlStudent.marksbytest);
router.put('/marks/set/:id', ctrlStudent.submit)

//api/admin
router.post('/adminregister', ctrlAdmin.adminregister);
router.post('/adminlogin', ctrlAdmin.adminlogin);
router.get('/getDetails/:clgID', ctrlAdmin.getdetail);

//api/admin/paper
router.post('/Createpaper', ctrlPaper.papers);
router.post('/addquestion', ctrlPaper.addquestions);
router.get('/getPaper/:clgID', ctrlPaper.getPaper);
router.put('/paper/set/:test', ctrlPaper.fillset)
router.get('/paperCreatedby/:name', ctrlPaper.getPaperbyCreator);
router.get('/getQuestion/:testname', ctrlPaper.getQuestions);
router.get('/results/:testname', ctrlPaper.getResult);
router.delete('/paper/:testname' ,ctrlPaper.delPaper)
router.delete('/question/:testname' ,ctrlPaper.delQ)

module.exports = router;

