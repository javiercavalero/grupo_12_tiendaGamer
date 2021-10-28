var express = require('express');
var router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

<<<<<<< HEAD
const {login,register, processRegister, processLogin,logout } =  require('../controllers/userController');
=======
const {login,register, processRegister, processLogin,logout, profile} =  require('../controllers/userController');
>>>>>>> f6a41749400de777a84d11dff80a5de6cd561239

const userLoginCheck = require('../middlewares/userLoginCheck')
const userCheck = require('../middlewares/userCheck')

/* GET users listing.
Empieza con /users */
router
        .get('/login', userCheck, login)
        .post('/login',loginValidator,processLogin)
        .get('/register', userCheck, register)
        .post('/register', registerValidator, processRegister)
<<<<<<< HEAD
        .get('/logout',logout)
=======
        .get('/logout',userLoginCheck, logout)
        .get('/profile',userLoginCheck, profile)
>>>>>>> f6a41749400de777a84d11dff80a5de6cd561239

module.exports = router;
