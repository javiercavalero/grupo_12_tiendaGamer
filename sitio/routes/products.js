var express = require('express');
var router = express.Router();

const {detail, productAdd, productEdit,destroy}= require('../controllers/productController');

/* router de productos */
router.get('/productAdd', productAdd);
router.get('/detail/:id', detail);
router.get('/edit',productEdit);
router.delete('/destroy/:id',destroy);


module.exports = router;
