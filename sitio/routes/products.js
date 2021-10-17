var express = require('express');
var router = express.Router();

const {detail, productAdd, productEdit,destroy}= require('../controllers/productController');

const controlller = require('../controllers/productController');

/* validaciones */
const productAddValidator= require('../validations/productAddValidator')


/* router de productos */
router.get('/create/', controlller.create);
router.post('/create',productAddValidator, controlller.store);
router.get('/detail/:id', detail);
router.get('/edit',productEdit);
router.delete('/destroy/:id',destroy);


module.exports = router;
