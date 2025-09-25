const userModel = require('../models/user.model');
const {asyncHandler} = require('../utils/asyncHandler');
const hashing = require('../utils/hashing')


const login = asyncHandler(async (req, res, next)=>{
    const {username, password} = req.body;

    const user = await userModel.getUser(username);
    if(user === null || user === undefined) return next(new Error('User not found'));

    await hashing.passValidate(password, user.hash)

    res.redirect('/home');
});

const register = asyncHandler(async (req, res, next)=>{
    const {username, first_name, last_name, password} = req.body;

    const hash = await hashing.genHashBcrypt(password);
    await userModel.createUser({username, first_name, last_name, hash});


})


module.exports = {
    login
}