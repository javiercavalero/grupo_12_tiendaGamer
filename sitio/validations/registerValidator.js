const {body, check} = require('express-validator');
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');

module.exports = [

    check('name')
        .notEmpty().withMessage('Ingresa un nombre'),
    
    check('email')
        .notEmpty().withMessage('Ingresa un email'),

    body('email')
    .custom((value, {req}) => {
        let user = users.find(user => user.email === value);
        if(user){
            return false
        }else{
            return true
        }
    }).withMessage('El email ingresado ya está registrado'),
    
    check('password')
        .isLength({
            min : 8,
            max: 20
        }).withMessage('La contraseña debe tener un mínimo de 8 y un máximo de 20 caracteres'),

    
]