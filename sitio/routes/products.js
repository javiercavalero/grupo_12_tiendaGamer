var express = require('express');
var router = express.Router();

const {detail, productAdd, productEdit}= require('../controllers/productController');

/* router de productos */
router.get('/productAdd', productAdd);
router.get('/detail', detail);
router.get('/edit',productEdit);

module.exports = router;
