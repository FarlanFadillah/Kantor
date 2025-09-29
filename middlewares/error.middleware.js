const {addMessage} = require("../utils/flash_messages");

function formErrorHandler(err, req, res, next){
    // flash message
    addMessage(req, err.type, err.message);
    // log
    //log(req, 'error', error.message, {module : 'Auth Router'});
    res.redirect(req.header('Referer') || '/');
}

function globalErrorHandler(err, req, res, next){

    console.log(err);

    res.locals.title = 'Error Page';
    res.status(err.status).render('pages/error_page', {error : err});
}

module.exports = {
    formErrorHandler,
    globalErrorHandler
}