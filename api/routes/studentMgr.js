const mongoose = require("mongoose");
const Student = require("../model/student");
const Schedule = require("../model/schedule");
const Course = require("../model/course");
const { studentValidation } = require("../validation");
const { expression } = require("@hapi/joi");

exports.saveStudent = async function (req, res, next) {
  //validate data before use
  const { error } = studentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await Student.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists!");

  // creat a new student
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
    invoice: req.body.invoice,
    level: req.body.level,
    schedules: [],
  });
  try {
    const savedStudent = await student.save();
    res.send({ student: student._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

//decrease the course remainCap

exports.addSchedule = async function (req, res, next) {
  const invoice = req.body.invoice;
  const level = req.body.level;
  const days = req.body.days;
  var schedule_list = [];
  Course.findOneAndUpdate(
    { level: level },
    { $inc: { remainCap: -1 } },
    function (err, course) {
      if (!err) {
        console.log("remaipCap updated");
        courseId = course._id;
        target_id = courseId.toString();
        for (let i = 0; i < days.length; i++) {
          var target_day = days[i];
          Schedule.find({ courseId: target_id }, { day: target_day })
            .select({ _id: 1 })
            .exec(function (err, schedule) {
              if (!err) {
                for (let i = 0; i < schedule.length; i++) {
                  var s_id = schedule[i]._id;
                  schedule_list.push(s_id.toString());
                }
                Student.findOneAndUpdate(
                  { invoice: invoice },
                  { schedules: schedule_list },
                  function (err, student) {
                    if (!err) {
                      console.log("Schedule updated");
                      res.status(200).send(student._id);
                    } else {
                      console.log(err);
                      res.status(400).send(err);
                    }
                  }
                );
              } else {
                console.log(err);
                res.status(400).send(err);
              }
            });
        }
      } else {
        console.log(err);
        res.status(400).send(err);
      }
    }
  );
};

exports.viewStudent = async function (req, res, next) {
  var target_invoice = req.params.invoice;
  console.log(target_invoice);
  Student.findOne({ invoice: target_invoice }, function (err, student) {
    if (!err) {
      res.send(student);
    } else {
      console.dir(err);
      res.status(400).send(err);
    }
  });
};

exports.updateStudent = async function (req, res, next) {
  var invoice = req.params.invoice;
  console.log(invoice);
  const updates = {};
  ops = req.body.ops;
  for (const op of ops) {
    updates[op.propName] = op.value;
  }
  Student.findOneAndUpdate(
    { invoice: invoice },
    { $set: updates },
    { new: true },
    function (err, doc) {
      if (!err) {
        res.status(200).send(doc);
      } else {
        res.status(400).send(err);
      }
    }
  );
};

exports.deleteStudent = function (req, res, next) {
  var invoice = req.params.invoice;
  Student.findOneAndDelete(invoice, function (err, student) {
    if (!err) {
      res.status(200).send(student);
    } else {
      res.status(400).send(err);
    }
  });
};
