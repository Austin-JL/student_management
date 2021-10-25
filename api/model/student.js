const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        requred: true,
        max: 255
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phone:{
        type: String,
        min: 10
    },
    gender:{
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    age:{
        type: Number,
        min:0,
        max:99
    },

    invoice:{
        type: String,
        min: 6,
        required: true
    },

    level:{
        type: String,
        required: true
    },
});

studentSchema.plugin(uniqueValidator, { mongoose: mongoose });

module.exports = mongoose.model('Student',studentSchema)