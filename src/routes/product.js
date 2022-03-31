var express = require('express');
const { createProduct, getAll } = require('../controllers/product.controller');
const { authCheck, adminMiddleware } = require('../middelwares/authcheck');
var multer  = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var router = express.Router();



/* GET users listing. */
router.post('/create',authCheck,adminMiddleware,upload.array('productPicture'),createProduct);
router.get('/getAll', getAll);
module.exports = router;