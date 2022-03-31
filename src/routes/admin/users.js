var express = require('express');
var router = express.Router();
var users= require('../../controllers/admin/users.controller.js');
const { authCheck } = require('../../middelwares/authcheck.js');
const { authValidatorSignIn, isAuthValidator, authValidatorSignUp } = require('../../validator/auth.validator.js');

var multer  = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
/* GET users listing. */
router.post('/signIn',authValidatorSignIn,isAuthValidator,users.signIn);
router.post('/signUp',authValidatorSignUp,isAuthValidator,upload.single('profilePicture'),users.signUp);
router.get('/getAll',users.getAll);
router.post('/profile',authCheck,users.profile);
module.exports = router;
