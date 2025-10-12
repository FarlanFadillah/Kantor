const {addMessage} = require("../utils/flash_messages");

/**
 * 
 * @param {Error} err 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 * 
 * This error handler, handle all form erorr.
 * use this for every form route.
 */
function formErrorHandler(err, req, res, next){
    // flash message
    addMessage(req, err.type, err.message);

    // log
    //log(req, 'error', error.message, {module : 'Auth Router'});
    res.redirect(req.header('Referer') || '/');
}

/**
 * Global error handler middleware.
 * 
 * This middleware catches any errors that were not handled
 * by previous middleware or route handlers.
 * It ensures that the server responds with a consistent
 * JSON error format and prevents the app from crashing.
 *
 * @param {Error} err - The error object thrown in the application.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
function globalErrorHandler(err, req, res, next){
    res.locals.title = 'Error Page';
    console.log(err)
    res.status(err.status || 500).render('pages/error_page', {error : err});
}

module.exports = {
    formErrorHandler,
    globalErrorHandler
}