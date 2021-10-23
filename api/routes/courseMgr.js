const mongoose = require('mongoose');
const Course = require('../model/course');
const {courseValidation} = require('../validation');

exports.saveCourse = async function(req,res,next){
    //validate data before use
    const {error} = courseValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Create a new Course
    const course = new Course({
        courseId: req.body.courseId,
        level: req.body.level,
        instructor: req.body.instructor,
        remainCap: req.body.remainCap,
    });
    try{
        const saveCourse = await course.save();
        res.send( {course: course._id});
    }catch(err){
        res.status(400).send(err);
    }
}
