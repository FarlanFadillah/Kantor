const {rateLimit} = require('express-rate-limit');
const {CustomError} = require("../utils/custom.error");
const {getRemainingTimeMinute} = require('../utils/datetime_tools');

/**
 * Login rate limiter middleware.
 * 
 * This middleware uses `express-rate-limit` to limit the number of login
 * attempts from a single IP within a specific time window.
 * 
 * - **Window**: 10 minutes  
 * - **Limit**: 5 requests per window  
 * 
 * When the limit is exceeded, it triggers a custom error message
 * prompting the user to wait until the cooldown period ends.
 * 
 * Example:
 * ```js
 * app.post('/auth/login', loginLimiter, loginController);
 * ```
 * 
 * @constant
 * @type {import('express-rate-limit').RateLimitRequestHandler}
 * 
 * @param {number} windowMs - Time frame for which requests are checked/remembered (in milliseconds).
 * @param {number} limit - Maximum number of allowed requests within the window.
 * @param {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction, options: object) => void} handler
 *   Custom handler executed when the limit is exceeded. It passes a `CustomError` with a message indicating
 *   how many minutes remain until the user can retry.
 * 
 * Dependencies:
 * - `express-rate-limit`
 * - `CustomError` (a custom error class)
 * - `getRemainingTimeMinute(resetTime)` (a helper function that converts remaining milliseconds to minutes)
 */
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