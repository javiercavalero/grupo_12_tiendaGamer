var express = require('express');
var router = express.Router(); 


const {detail, edit, create, store, destroy,update, search, list, category }= require('../controllers/productController');



/* validaciones */
const productAddValidator= require('../validations/productAddValidator')
const adminLoginCheck = require('../middlewares/adminLoginCheck');
const upload = require('../middlewares/uploadImagesProduct')

/* router de productos */
router.get('/create/', adminLoginCheck, create);
router.post('/create', upload.single('image'), productAddValidator, store);
router.get('/search',search);
router.get('/list', list);
router.get('/detail/:id', detail);
router.get('/edit/:id',adminLoginCheck, edit);
router.put('/update/:id', upload.single('image') ,productAddValidator , update);
router.delete('/destroy/:id',destroy);

router.get('/category/:id', category)


module.exports = router;
