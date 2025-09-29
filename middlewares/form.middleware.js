export function saveFormState(req, res, next){
    res.locals.form_data = req.session.form_data || '';
    next();
}
