const { string, number } = require('@hapi/joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const scheduleSchema = new mongoose.Schema({
        courseDate:{
            type: String,
            enum: ['Monday', 'Tuesday', 
                'Wednesday', 'Thursday', 
                'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        startTime:{
            type: String,
            required: true
        },
        endTime:{
            type: String,
            required: true
        }
});

scheduleSchema.plugin(uniqueValidator, { mongoose: mongoose });

module.exports = mongoose.model('Schedule',scheduleSchema)