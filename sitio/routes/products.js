var express = require('express');
var router = express.Router();

const {detail, productAdd}= require('../controllers/productController');

/* router de productos */
router.get('/productAdd', productAdd)
router.get('/detail', detail);

module.exports = router;
