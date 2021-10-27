const { compareSync } = require('bcryptjs');
const mongoose = require('mongoose');
const schedule = require('../model/schedule');
const Schedule = require('../model/schedule');
const { scheduleValidation } = require('../validation');


exports.saveSchedule = async function (req, res, next) {
    
    var course_id = req.params.id;

    //validate data before use
    const { error } = scheduleValidation(req.body.schedule);
    if (error) return res.status(400).send(error.details[0].message);

    start_date = Date.parse(req.body.start_date);
    end_date = Date.parse(req.body.end_date);
    schedules = req.body.schedules;
    let loop = new Date(start_date);
    console.log(loop);
    while (loop <= end_date) {
        console.log("schedule is creating ..")
        for (let i = 0; i < schedules.length; i++) {
            var target = schedules[i];
            target_day = target.day;
            if (loop.getDay() == target_day) {

                var tmp = loop.toISOString();
                course_date = tmp.slice(0,10);
                console.log(course_date);

                //check if the schedule is already exist
                const scheduleExist = await Schedule.findOne({courseId: course_id, course_date: course_date});
                if (scheduleExist) return res.status(400).send('Schedule already exists')

                //Create a new Course
                const schedule = new Schedule({
                    courseId: course_id,
                    day: target_day,
                    course_date: course_date,
                    start_time: target.start_time,
                    end_time: target.end_timehop
                });

                schedule.save(function (err, schedule) {
                    console.log("[DEBUG]:scheduleMgr.save invoked");
                    if (!err) {
                        console.dir(schedule);
                    } else {
                        console.dir(err);
                        res.status(400).send(err);
                    }
                });
            }
        }

        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    res.status(200).send("Finished")
}


