const router = require('express').Router();
const Student = require('../model/student');
const Course = require('../model/course');
const Schedule = require('../model/schedule');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {studentValidation, courseValidation,scheduleValidation} = require('../validation');

const studentMgr = require("./studentMgr")
const courseMgr = require("./courseMgr")
const scheduleMgr = require('./scheduleMgr')

router.post('/studentRegister', studentMgr.saveStudent);
router.post('/courseRegister', courseMgr.saveCourse);
router.post('/courseRegister/addSchedule/:id', scheduleMgr.saveSchedule)
router.post('/studentRegister/addSchedule/:invoice', studentMgr.addSchedule)
//Login
// router.post('/login', async (req,res) => {
//     const {error} = loginValidation(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     //Checking if the user is already in the database
//     const user = await User.findOne({email:req.body.email});
//     if(!user) return res.status(400).send('Email is not found!');
//     //check password is correct
//     const validPass = await bcrypt.compare(req.body.password, user.password);
//     if(!validPass) return res.status(400).send('Invalid password!')

//     //Create and assign a token

//     const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
//     res.header('auth-token',token).send(token);
// });

module.exports = router;