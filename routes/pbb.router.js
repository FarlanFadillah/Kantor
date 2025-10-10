const { renderPbbFormPage } = require('../controllers/pbb.controller');

const router = require('express').Router();



router.route('/form')
    .get(renderPbbFormPage);


module.exports = router;