const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const seriesController = require('../controllers/seriesController');
const sessionAdminCheck = require('../middlewares/sessionAdminCheck')

router.get('/',seriesController.all);
router.get('/list',seriesController.list);
router.get('/detail/:id',seriesController.detail);
router.post('/search',seriesController.search);

router.get('/create',sessionAdminCheck, seriesController.create);
router.post('/create', seriesController.save);

router.get('/edit/:id',sessionAdminCheck,seriesController.edit);
router.put('/edit/:id',seriesController.update);

router.delete('/delete/:id',seriesController.delete);

module.exports = router;