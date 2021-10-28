const mongoose = require('mongoose');
const Student = require('../model/student');
const Schedule = require('../model/schedule');
const {studentValidation} = require('../validation');

exports.saveStudent = async function(req,res,next){
    //validate data before use
    const {error} = studentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await Student.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists!');

    // creat a new student
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        age: req.body.age,
        invoice: req.body.invoice,
        level: req.body.level,
        schedules: []
    });
    try{
        const savedStudent = await student.save();
        res.send( {student: student._id});
    }catch(err){
        res.status(400).send(err);
    }
}

exports.addSchedule = async function(req,res,next){
    const invoice = req.body.invoice;
    const level = req.body.level;
    const days = req.body.days;
    var target_student = await Student.findOne({invoice: invoice});
    for (let i = 0; i < days.length; i++){
        var target_day = days[i]
        Schedule.find({level: level, day:target_day})
                .select({"_id": 1})
                .exec(function(err,schedule){
                    if (!err){
                        for(let i = 0; i < schedule.length; i++){
                            var s_id = schedule[i]._id;
                            target_student.schedules.push(s_id);
                        }
                    }
                })
    }
    target_student.save(function (err, course) {
        console.log("[DEBUG]:courseMgr.save invoked");
        if (!err) {
            console.dir('success');
            res.status(200).send({target_student: target_student._id})
        } else {
            console.dir(err);
            res.status(400).send(err);
        }
    });
}

