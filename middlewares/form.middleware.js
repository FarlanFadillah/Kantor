export function initFormState(req, res, next){
    if(!req.session.form_data){
        req.session.form_data = {};
    }
    next();
} // this middleware should be used once, at the begining of the app (index.js)

export function saveFormState(req, res, next){
    req.session.form_data = req.body;
    next();
} // this middleware should be used on routes that handle form submissions

export function getFormState(req, res, next){
    console.log(req.session.form_data);
    res.locals.form_data = req.session.form_data || {};
    req.session.form_data = {};
    next();
} // this middleware should be used on routes that render forms after saveFormState middleware

