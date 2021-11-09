var express = require('express');
var router = express.Router();
const upload = require('../middlewares/uploadImagesProduct');

const {detail, productAdd, productEdit,destroy,update }= require('../controllers/productController');

const controlller = require('../controllers/productController');

/* validaciones */
const productAddValidator= require('../validations/productAddValidator')
const adminLoginCheck = require('../middlewares/adminLoginCheck')

/* router de productos */
router.get('/create/', adminLoginCheck, controlller.create);
router.post('/create', upload.array('images'), productAddValidator, controlller.store);
router.get('/detail/:id', detail);
router.get('/edit/:id',adminLoginCheck, productEdit);
router.put('/update/:id', update);
router.delete('/destroy/:id',destroy);


module.exports = router;
