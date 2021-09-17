var express = require('express');
var router = express.Router();

const {index,admin, carrito}= require('../controllers/mainController')

/* GET home page. */
router.get('/', index);
router.get('/admin',admin);
router.get('/carrito', carrito)

module.exports = router;