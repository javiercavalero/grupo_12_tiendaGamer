const{check}= require('express-validator');
module.exports = [  
    check('name')
    .notEmpty()
    .withMessage('El campo nombre es requerido'),
    

     check('contraseña')
    .notEmpty()
    .isLength({
        min: 8,
        max: 20
    }).withMessage('Debe ingresar una contraseña entre 8 y 20 carácteres') 
]