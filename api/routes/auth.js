const router = require('express').Router();
const Student = require('../model/student');
const Course = require('../model/course');
const Schedule = require('../model/schedule');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {studentValidation, courseValidation,scheduleValidation} = require('../validation');

router.post('/studentRegister', async (req,res)=>{
    //validate data before use
    const {error} = studentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await Student.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists!');
    
    //Hash passwords
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //Create a new Student
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age,
        invoice: req.body.invoice,
        level: req.body.level
    });
    try{
        const savedStudent = await student.save();
        res.send( {student: student._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/addTime', async (req,res)=>{
    //validate schedule before use
    const {error} = scheduleValidation(req.body.schedule);
    if(error) return res.status(400).send(error.details[0].message);

    //Create a new schedule
    const schedule = new Schedule({
        courseDate: req.body.courseDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
    });
    try{
        const findStudent = await Student.findByIdAndUpdate(req.body.invoice,
            {assignedSchedule: req.body.schedule});
        console.dir(doc);;
    }catch(err){
        console.dir(err);
    }
});




router.post('/courseRegister', async (req,res)=>{
    //validate data before use
    const {error} = courseValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the course is already in the database
    
    
    // cID = shortid.generate();    

    //Create a new Course
    const course = new Course({
        level: req.body.level,
        // classID: cID,
        // password: hashedPassword
        instructor: req.body.instructor,
        Schedule: {
            courseDate: req.body.Schedule.courseDate,
            startTime: req.body.Schedule.startTime,
            endTime: req.body.Schedule.endTime,
            remainCap: req.body.Schedule.remainCap,
        }
    });
    try{
        const saveCourse = await course.save();
        res.send( {course: course._id});
    }catch(err){
        res.status(400).send(err);
    }
});




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