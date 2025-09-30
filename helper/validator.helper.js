const validator = require('express-validator');

const requiredTextValidator = (field) => {
    return validator.body(field)
        .trim()
        .notEmpty().withMessage(field + ' cant be empty')
        .matches(/^[^<>]*$/).withMessage(field + 'cant contain html element')
        .escape()
}

const optionalTextValidator = (field) => {
    return validator.body(field)
        .trim()
        .matches(/^[^<>]*$/).withMessage(field + 'cant contain html element')
        .escape()
}

module.exports = {
    requiredTextValidator,
    optionalTextValidator
}