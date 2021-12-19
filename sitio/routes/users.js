var express = require('express');
var router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');
const upload = require('../middlewares/multerImageCheck');
const userLoginCheck = require('../middlewares/userLoginCheck')
const userCheck = require('../middlewares/userCheck')


const {login,register, processRegister, processLogin,logout,profile,update } =  require('../controllers/userController');



/* GET users listing.
Empieza con /users */
router
        .get('/login', userCheck, login)
        .post('/login',loginValidator,processLogin)
        .get('/register',  userCheck , register)
        .post('/register', registerValidator, processRegister)
        .get('/logout',userLoginCheck, logout)
        .get('/profile',userLoginCheck, profile)
        .post('/profile',upload.single('avatar'), profileValidator, update)

module.exports = router;
