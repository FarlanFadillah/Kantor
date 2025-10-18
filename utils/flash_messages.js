/**
 * 
 * @param {import("express").RequestHandler} req 
 * @param {['info', 'error', 'warn']} type 
 * @param {String} text 
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