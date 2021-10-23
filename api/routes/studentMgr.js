const mongoose = require('mongoose');
const Student = require('../model/student');
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
        level: req.body.level
    });
    try{
        const savedStudent = await student.save();
        res.send( {student: student._id});
    }catch(err){
        res.status(400).send(err);
    }
}

