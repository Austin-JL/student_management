const { string, number, date } = require('@hapi/joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const courseSchema = new mongoose.Schema({
    level:{
        type: String,
        required: true,
    },
    instructor:{
        type: String,
        required: true
    },
    remainCap:{
        type: Number,
        required: true
    },
});

courseShcema.plugin(uniqueValidator, { mongoose: mongoose });

module.exports = mongoose.model('Course',courseSchema)