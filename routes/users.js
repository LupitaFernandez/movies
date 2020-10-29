var express = require('express');
var router = express.Router();
let userController = require ('../controllers/userController')
let loginValidator = require ('../validators/loginValidator')

/* GET users listing. */
router.get('/register', userController.register);
router.post ('/register', userController.processRegister);
router.get('/login', userController.login);
router.post ('/login', loginValidator, userController.processLogin);
router.get ('/logout', userController.logout)


module.exports = router;
