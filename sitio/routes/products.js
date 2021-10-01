var express = require('express');
var router = express.Router();

const {detail, productAdd, productEdit}= require('../controllers/productController');
const controlller = require('../controllers/productController')
/* router de productos */
router.get('/create/', controlller.create);
router.post('/create', controlller.store);
router.get('/detail', detail);
router.get('/edit',productEdit);


module.exports = router;
