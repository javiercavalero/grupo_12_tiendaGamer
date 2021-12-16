const{check}= require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage('Nombre de producto obligatorio').bail()
    .isLength({min:5})
    .withMessage('El nombre debe tener al menos 5 caracteres') ,

    check('description')
    .notEmpty()
    .withMessage('Descripcion obligatoria').bail()
    .isLength({ min : 15})
    .withMessage('La descripción debe tener mínimo 15 carácteres'),

    check('price')
    .isInt({min:1})
    .withMessage('El valor debe ser mayor a 1, sin "." ni ","'),

    check('discount')
    .isInt({min:0})
    .withMessage('Agregar el descuento'),

    check('category')
    .notEmpty()
    .withMessage('Indicá la categoría'),
   
]
