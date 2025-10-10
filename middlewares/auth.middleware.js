const { addMessage } = require("../utils/flash_messages");

/**
 * 
 * This middleware make sure user 
 * is authenticated. if the user unauthenticated
 * the route is redirected to /auth/login.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function.
 */
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