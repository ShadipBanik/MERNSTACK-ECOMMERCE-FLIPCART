var express = require('express');
const { addCart, getAll } = require('../controllers/cart.controller');
const { authCheck, adminMiddleware } = require('../middelwares/authcheck');
var router = express.Router();



/* GET users listing. */
router.post('/add',authCheck,addCart);
router.get('/getAll',getAll);
module.exports = router;