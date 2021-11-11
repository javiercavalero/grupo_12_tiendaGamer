var express = require('express');
var router = express.Router();

const {detail, productAdd, productEdit,destroy,update }= require('../controllers/productController');
const multer = require('multer');
const path = require('path')

const controlller = require('../controllers/productController');

/* configuración de multer */
const storage = multer.diskStorage({
destination : (req,file,callback) => {
callback(null, './public/images/products')

},
filename : (req,file,callback) => {
callback(null,'img-phone' + Date.now() + path.extname(file.originalname))

}

})

const upload = multer({
    storage
})

/* validaciones */
const productAddValidator= require('../validations/productAddValidator')
const adminLoginCheck = require('../middlewares/adminLoginCheck')

/* router de productos */
router.get('/create/', adminLoginCheck, controlller.create);
router.post('/create',upload.single('image'), productAddValidator, controlller.store);
router.get('/detail/:id', detail);
router.get('/edit/:id',adminLoginCheck, productEdit);
router.put('/update/:id', upload.single('image') , update);
router.delete('/destroy/:id',destroy);


module.exports = router;
