var express = require('express');
var router = express.Router();
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

const {login,register, processRegister, processLogin} =  require('../controllers/userController');



/* GET users listing. */
router
        .get('/login', login)
        .post('/login',loginValidator,processLogin)
        .get('/register', register)
        .post('/register', registerValidator, processRegister)

module.exports = router;
