
/**
 * Initialize the req.session.form_data object
 * this middleware should be used once, at the begining of the app (index.js)
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function. 
 */
export function initFormState(req, res, next){
    if(!req.session.form_data){
        req.session.form_data = {};
    }
    next();
}

/**
 * Saved the current form into req.session.form_data object.
 * this middleware should be used on routes that handle form submissions
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function. 
 */
export function saveFormState(req, res, next){
    req.session.form_data = req.body;
    next();
}

/**
 * Get the form data from req.session.form_data and save it into res.locals object.
 * this middleware should be used on routes that render forms.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function. 
 */
export function getFormState(req, res, next){
    res.locals.form_data = req.session.form_data || {};
    req.session.form_data = {};
    next();
}

/**
 * Clear the form data from req.session.form_data and res.locals object.
 * this middleware should be used when a submition is successfully.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function. 
 */
export function clearFormState(req, res, next){
    req.session.form_data = {};
    res.locals.form_data = {};
    next();
}

