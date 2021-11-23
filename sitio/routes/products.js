var express = require('express');
var router = express.Router();


const {detail, productAdd, productEdit,destroy,update }= require('../controllers/productController');
const multer = require('multer');
const path = require('path')

const controlller = require('../controllers/productController');




/* validaciones */
const productAddValidator= require('../validations/productAddValidator')
const adminLoginCheck = require('../middlewares/adminLoginCheck');
const upload = require('../middlewares/uploadImagesProduct')

/* router de productos */
router.get('/create/', adminLoginCheck, productController.create);
router.post('/create', upload.single('images'), productAddValidator, controlller.store);
router.get('/detail/:id', detail);
router.get('/edit/:id',adminLoginCheck, productEdit);
router.put('/update/:id', upload.single('image') , update);
router.delete('/destroy/:id',destroy);


module.exports = router;
