const userModel = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const { CustomError } = require('../utils/custom.error');
const hashing = require('../utils/hashing')
const {addMessage} = require("../utils/flash_messages");

const renderLoginPage = asyncHandler(async (req, res, next)=>{
    if(req.session.isAuthenticated) return res.redirect('/');
    res.locals.title = 'Login Page';
    res.status(200).render('pages/login_page');
});

const renderRegisterPage = asyncHandler(async(req, res, next)=>{
    res.locals.title = 'Register Page';
    res.status(200).render('pages/register_page');
});

const login = asyncHandler(async (req, res, next)=>{
    const {username, password} = req.body;

    const user = await userModel.getUser(username);

    if(user === undefined) return next(new CustomError('User not found', 'warn'));

    await hashing.passValidate(password, user.hash);

    req.session.user = {
        username : user.username,
        first_name : user.first_name,
        last_name : user.last_name
    }
    req.session.isAuthenticated = true;

    // flash message
    addMessage(req, 'info', 'User successfully logged in');

    res.redirect('/admin/dashboard');
});

const register = asyncHandler(async (req, res, next)=>{
    const {username, first_name, last_name, password} = req.body;


    const hash = await hashing.genHashBcrypt(password);
    await userModel.createUser({username, first_name, last_name, hash});

    // flash message
    addMessage(req, 'info', 'User successfully created');

    res.redirect('/auth/login');
})

const logout = asyncHandler(async (req, res, next)=>{
    req.session.destroy();
    res.redirect('/auth/login');
})


module.exports = {
    login,
    register,
    logout,
    renderLoginPage,
    renderRegisterPage
}