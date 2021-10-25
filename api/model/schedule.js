const { string, number } = require('@hapi/joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const scheduleSchema = new mongoose.Schema({
    courseId: { 
        type: String, 
        required: true, 
        index: true, 
        unique: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    start_time:{
        type: Date,
    },
    end_time:{
        type: Date
    }
});

scheduleSchema.plugin(uniqueValidator, { mongoose: mongoose });

module.exports = mongoose.model('Schedule',scheduleSchema)