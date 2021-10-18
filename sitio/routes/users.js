var express = require('express');
var router = express.Router();
const registerValidator = require('../validations/registerValidator');

const {login,register, processRegister} =  require('../controllers/userController');



/* GET users listing. */
router
        .get('/login', login)
        .get('/register', register)
        .post('/register', registerValidator, processRegister)

module.exports = router;
