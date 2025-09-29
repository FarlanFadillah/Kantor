const validator = require('express-validator');
const {CustomError} = require("../utils/custom.error");
const {addMessage} = require('../utils/flash_messages')
const {clientTextFields} = require('../rules/form_fields')
const {textValidator} = require("../helper/validator.helper");
const loginValidator = [
    validator.body('username').notEmpty().withMessage('Username / Email is required'),
    validator.body('password').notEmpty().withMessage('Password is required')
];

const accountProfileValidator = [
    validator.body('username')
        .trim()
        .isLength({min : 4}).withMessage('Usernames must be at least 4 characters long')
        .notEmpty().withMessage('Username / Email is required')
        .matches(/^[^<>]*$/).withMessage("username can't contain html tags")
        .escape(),

    validator.body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required')
        .matches(/^[^<>]*$/).withMessage("first name can't contain html tags")
        .escape(),

    validator.body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .matches(/^[^<>]*$/).withMessage("last name can't contain html tags")
        .escape()
]

const passwordValidator = [
    validator.body('password')
        .isLength({min : 8}).withMessage('Password must be at least 8 characters long')
    ,
    validator.body('confirm_password')
        .optional({checkFalsy : true})
        .custom((value, {req}) =>{
            if(req.body.password && value !== req.body.password){
                throw new CustomError('Password confirmation does not match password', 'warn');
            }
            return true;
        }),
    validator.body('old_password')
        .optional({checkFalsy : true})
        .custom((value, {req}) =>{
            if(req.body.password && value === req.body.password){
                throw new CustomError('Your new password should not be the same as your old one', 'warn');
            }
            return true;
        })
]

function validatorErrorHandler(req, res, next){
    const errors = validator.validationResult(req);

    if(!errors.isEmpty()){
        console.log("[VALIDATOR ERRORS HANLDER]")
        for(errMsg of errors.array()) {
            // log(req, 'warn', errMsg.msg, {module : 'ValErr Mddlwre'});
            console.log(errMsg);
            req.session.form_data = req.body;
            addMessage(req, 'warn', errMsg.msg);
        }
        return next(new CustomError("Validation failed.", 'warn'));
    }
    next();
}

const clientFormValidator = [
    validator.body('nik').isNumeric().notEmpty(),
    validator.body('phone_number').isNumeric().notEmpty(),
    ...clientTextFields.map(textValidator)
]






module.exports = {
    loginValidator,
    accountProfileValidator,
    passwordValidator,
    clientFormValidator,
    validatorErrorHandler
}