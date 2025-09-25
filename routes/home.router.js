const router = require('express').Router();
const {renderHomePage} = require('../controllers/home.controller');

// middleware
const {authentication} = require('../middlewares/auth.middleware')

router.route('/')
        .get(renderHomePage);


module.exports = router; 