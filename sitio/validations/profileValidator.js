const{check}= require('express-validator');
module.exports = [  
    check('name')
    .notEmpty()
    .withMessage('El campo nombre es requerido'),
    
 
]