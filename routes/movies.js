const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const moviesController = require('../controllers/moviesController');
const sessionAdminCheck = require('../middlewares/sessionAdminCheck')

router.get('/',moviesController.all);
router.get('/list',moviesController.list);
router.get('/detail/:id',moviesController.detail);
router.post('/search',moviesController.search);

router.get('/create',sessionAdminCheck, moviesController.create);
router.post('/create', moviesController.save);

router.get('/edit/:id',sessionAdminCheck,moviesController.edit);
router.put('/edit/:id',moviesController.update);

router.delete('/delete/:id',moviesController.delete);

module.exports = router;