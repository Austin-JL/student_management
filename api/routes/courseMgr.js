const mongoose = require('mongoose');
const Course = require('../model/course');
const {courseValidation} = require('../validation');

exports.saveCourse = async function(req,res,next){
    //validate data before use
    const {error} = courseValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Create a new Course
    const course = new Course({
        level: req.body.level,
        instructor: req.body.instructor,
        remainCap: req.body.remainCap,
    });

    course.save(function (err, course) {
        console.log("[DEBUG]:courseMgr.save invoked");
        if (!err) {
            console.dir(course);
            res.status(200).send({course: course._id})
        } else {
            console.dir(err);
            res.status(400).send(err);
        }
    });
}
