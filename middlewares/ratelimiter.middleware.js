const {rateLimit} = require('express-rate-limit');
const {CustomError} = require("../utils/custom.error");
const {getRemainingTimeMinute} = require('../utils/datetime_tools');

const loginLimiter = rateLimit({
    windowMs : 10 * 60 * 1000,
    limit : 5,
    handler : (req, res, next, options)=>{
        next(new CustomError(`To many login attempts, please try again in ${Math.floor(getRemainingTimeMinute(req.rateLimit.resetTime))} minutes`, 'warn'));
    }
});


// unused for now
const change_passwordLimiter = rateLimit({
    windowMs : 10 * 60 * 1000,
    limit : 5,
    handler : (req, res, next, options)=>{
        next(new CustomError(`To many attempts, please try again in ${Math.floor(getRemainingTimeMinute(req.rateLimit.resetTime))} minutes`, 'warn'));
    }
})


module.exports = {
    loginLimiter
};