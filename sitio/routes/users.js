var express = require('express');
var router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

const {login,register, processRegister, processLogin,logout, profile} =  require('../controllers/userController');

const userLoginCheck = require('../middlewares/userLoginCheck')
const userCheck = require('../middlewares/userCheck')

/* GET users listing.
Empieza con /users */
router
        .get('/login', userCheck, login)
        .post('/login',loginValidator,processLogin)
        .get('/register', userCheck, register)
        .post('/register', registerValidator, processRegister)
        .get('/logout',userLoginCheck, logout)
        .get('/profile',userLoginCheck, profile)

module.exports = router;
