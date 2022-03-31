var express = require('express');
const { catgoryCreate, getAllCategory,deletetCategory } = require('../controllers/category.controller');
const { authCheck, adminMiddleware } = require('../middelwares/authcheck');
var multer  = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
var router = express.Router();



/* GET users listing. */
router.post('/create',authCheck,adminMiddleware ,upload.single('categoryImage'),catgoryCreate);
router.get('/getAll',getAllCategory);
router.delete('/delete/:id',deletetCategory);
module.exports = router;