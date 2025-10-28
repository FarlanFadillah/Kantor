/**
 * 
 * @param {import("express").RequestHandler} req 
 * @param {['info', 'error', 'warn']} type 
 * @param {String} text 
 * this function saved the message inside the session object, and later
 * will added to locals memory so the ejs can access it to show 
 * flash message
 */
function addMessage(req, type, text){
    if(!Array.isArray(req.session.messages)){
        req.session.messages = [];
    }
    req.session.messages.push({type, text});
}

module.exports = {
    addMessage
}