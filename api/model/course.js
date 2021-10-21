const { string, number } = require('@hapi/joi');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const courseShcema = new mongoose.Schema({
    courseId: { 
        type: String, 
        required: true, 
        index: true, 
        unique: true 
    },
    level:{
        type:String,
        requred: true,
        max: 255
    },
    instructor:{
        type: String,
        required: true
    },
    remainCap:{
        type: Number,
        required: true
    },
    schedule: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'schedule' }
    ]
});

courseShcema.plugin(uniqueValidator, { mongoose: mongoose });

module.exports = mongoose.model('Course',courseShcema)