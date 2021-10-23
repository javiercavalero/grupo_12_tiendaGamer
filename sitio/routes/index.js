var express = require('express');
var router = express.Router();

const {index,admin, carrito} = require('../controllers/mainController')

const adminLoginCheck = require('../middlewares/adminLoginCheck')

/* GET home page. */
router.get('/', index);
router.get('/admin', adminLoginCheck, admin);
router.get('/carrito', carrito)

module.exports = router;
