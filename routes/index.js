var express = require('express');
var router = express.Router();
let mainController = require('../controllers/mainController')
let localsUserCheck = require ('../middlewares/localsUserCheck')


/* GET home page. */
router.get('/', localsUserCheck, mainController.index);

module.exports = router;
