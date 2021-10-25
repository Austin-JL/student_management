//Validation

const Joi = require('@hapi/joi');


// Register validation
const studentValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        phone: Joi.string().min(10).required(),
        gender: Joi.string().valid('Male', 'Female').required(),
        age: Joi.number().required(),
        invoice: Joi.string().min(6).required(),
        level: Joi.string().required()
    });
    return schema.validate(data)
};

const courseValidation = data => {
    const schema = Joi.object({
        level: Joi.string().required(),
        instructor: Joi.string().required(),
        remainCap: Joi.number().required(),
    });
    return schema.validate(data)
};


const scheduleValidation = data => {
    const schema = Joi.object({
        date: Joi.date().required(),
        start_time: Joi.date().required(),
        end_time: Joi.date().required(),
        
    });
    return schema.validate(data)
};

module.exports.studentValidation = studentValidation;
module.exports.courseValidation = courseValidation;
module.exports.scheduleValidation = scheduleValidation;