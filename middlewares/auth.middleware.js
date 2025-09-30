const { addMessage } = require("../utils/flash_messages");

function authentication(req, res, next){
    console.log('[AUTH MIDDLEWARE]', req.method, req.originalUrl);
    if(!req.session.isAuthenticated) {
        console.log('[AUTH FAILED] redirecting...');
        addMessage(req, 'warn', 'Please login to continue');
        return res.redirect('/auth/login');
    }
    console.log('[AUTH PASSED]');
    next();
}



module.exports = {
    authentication
};