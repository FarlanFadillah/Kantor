const {addMessage} = require('../utils/flash_messages')

const urlMap = [
    { url : 'login', redirect : '/auth/login'},
    { url : 'register', redirect : '/auth/register'},
    { url : 'delete', redirect : '/admin'},
    { url : 'settings', redirect : '/auth/settings'},
    { url : 'change-password', redirect : '/auth/settings'}
]

function authentication(req, res, next){
    console.log('[AUTH MIDDLEWARE]', req.method, req.originalUrl);
    if(!req.session.isAuthenticated) {
        console.log('[AUTH FAILED] redirecting...');
        return res.redirect('/auth/login');
    }
    console.log('[AUTH PASSED]');
    next();
}

function errorAuthentication(err, req, res, next){
    // flash message
    addMessage(req, err.type, err.message);
    // log
    //log(req, 'error', error.message, {module : 'Auth Router'});
    console.log(req.session.messages);

    const matched = urlMap.find(({url}) => req.originalUrl.includes(url))
    if(matched) {
        return res.redirect(req.header('Referer') || '/');
    }
    next(err);
}

module.exports = {
    authentication,
    errorAuthentication
};