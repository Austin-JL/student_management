const mongoose = require('mongoose');
const Schedule = require('../model/schedule');
const { scheduleValidation } = require('../validation');


exports.saveSchedule = async function (req, res, next) {
    //validate data before use
    var course_id = req.params.id;
    const { error } = scheduleValidation(req.body.schedule);
    if (error) return res.status(400).send(error.details[0].message);

    caluclateTime(req.body.schedule,
         req.body.start_date, 
         req.body.end_date,
         course_id
         )
}



function caluclateTime(schedules, start_date, end_date, course_id,) {
    let loop = new Date(start_date);
    while (loop <= end_date) {
        for (let i = 0; i < schedules.length; i++) {
            var target = schedules[i];
            target_day = target.date
            if (getDayofWeek(loop) == target) {

                //Create a new Course
                const schedule = new Schedule({
                    courseId: course_id,
                    start_time: target.start_time,
                    end_time: target.end_time
                });

                schedule.save(function (err, schedule) {
                    console.log("[DEBUG]:scheduleMgr.save invoked");
                    if (!err) {
                        console.dir(schedule);
                        //res.redirect('/courseRegister/addTime');
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
}

function getDayofWeek(loop) {
    switch (loop.getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
    }
}