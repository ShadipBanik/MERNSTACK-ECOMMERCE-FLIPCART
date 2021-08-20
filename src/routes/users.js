var express = require('express');
var router = express.Router();
var users= require('../controllers/users.controller.js')
/* GET users listing. */
router.get('/signIn',users.signIn);
router.post('/signUp',users.signUp);

module.exports = router;
