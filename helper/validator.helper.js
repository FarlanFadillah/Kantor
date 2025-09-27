const validator = require('express-validator');

const textValidator = (field) => {
    return validator.body(field)
        .trim()
        .notEmpty()
        .matches(/^[^<>]*$/)
        .escape()
}

module.exports = {
    textValidator,
}