const {addMessage} = require("../utils/flash_messages");

function formErrorHandler(err, req, res, next){
    // flash message
    addMessage(req, err.type, err.message);

    // log
    //log(req, 'error', error.message, {module : 'Auth Router'});
    res.redirect(req.header('Referer') || '/');
}

function globalErrorHandler(err, req, res, next){
    res.locals.title = 'Error Page';
    console.log(err.message)
    res.status(err.status || 500).render('pages/error_page', {error : err});
}

module.exports = {
    formErrorHandler,
    globalErrorHandler
}