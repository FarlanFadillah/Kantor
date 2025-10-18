const validator = require('express-validator');

/**
 * 
 * @param {string} field 
 * 
 * This validator make sure the field is not empty, 
 * does not contain any html tag, and sanitize the value
 */
const requiredTextValidator = (field) => {
    return validator.body(field)
        .trim()
        .notEmpty().withMessage(field + ' cant be empty')
        .matches(/^[^<>]*$/).withMessage(field + 'cant contain html element')
        .escape()
}

/**
 * 
 * @param {string} field 
 * This validator make sure that the field 
 * does not contain any html tag, and sanitize the value
 */
const optionalTextValidator = (field) => {
    return validator.body(field)
        .trim()
        .matches(/^[^<>]*$/).withMessage(field + 'cant contain html element')
        .escape()
}



const optionalIDvalidator = (field) =>{
    return validator.body(field)
    .trim()
    .custom(value => {
        return value ? !isNaN(value) : true;
    })
    .customSanitizer(value=>{
        return value || null;
    })
}

module.exports = {
    requiredTextValidator,
    optionalTextValidator,
    optionalIDvalidator
}