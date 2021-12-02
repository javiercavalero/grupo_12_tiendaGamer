const {body,check} = require('express-validator');
const db = require('../database/models');

module.exports = [

    check('name')
    .notEmpty().withMessage('Ingresa un nombre')
    .isLength({
        min: 2,
        max: 30
    }),

    check('email')
    .notEmpty().withMessage('Ingresa un email').bail()
    .isEmail().withMessage('Email inválido'),

    body('email')
    .custom(value => {
        return db.User.findOne({
                where: {
                    email: value
                }
            })
            .then(user => {
                if (user) {
                    return Promise.reject('El email ya esta registrado');
                }
            })
            .catch(error => console.log(error))
    }),

    check('password')
    .isLength({
        min: 8,
        max: 20
    }).withMessage('La contraseña debe tener un mínimo de 8 y un máximo de 20 caracteres'),


]