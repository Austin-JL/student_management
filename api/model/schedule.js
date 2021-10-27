const { string, number } = require('@hapi/joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const scheduleSchema = new mongoose.Schema({
    //id of courseSchema
    courseId: { 
        type: String, 
        required: true
    },
    course_date: {
        type: String,
    },
    day: {
        type: Number,
        min: 0,
        max: 6,
    },
    start_time:{
        type: String,
    },
    end_time:{
        type: String
    }
});

scheduleSchema.plugin(uniqueValidator, { mongoose: mongoose });

module.exports = mongoose.model('Schedule',scheduleSchema)