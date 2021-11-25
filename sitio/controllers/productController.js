const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));

const toThousand = require('../utils/toThousand');
const toDiscount = require('../utils/toDiscount');


/* validaciones */
const { validationResult } = require('express-validator');

/* base de datos */
const { Op, where } = require('sequelize');
const db = require('../database/models');

module.exports = {

    list: (req, res) => {
        db.Product.findAll()
            .then(products => {
                /*return res.render(products)*/
                res.render('productsList.ejs', {
                    products,
                    toThousand,
                    toDiscount
                })
            })
            .catch(error => console.log(error))

    },

    detail: (req, res) => {

        db.Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(product => {
                // return res.send(product)
                db.Category.findByPk(product.categoryId, {
                    include: [
                        {
                            association: 'products'
                        }
                    ]
                })
                    .then(category => {
                        return res.render('detalleProducto', {
                            product,
                            products: category.products
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

    },

    search: (req, res) => {

        let products = db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.keyword
                }
            }
        })
        let categories = db.Category.findAll()

        Promise.all([products, categories])

            .then(([products, categories]) => {
                return res.render('results.ejs', {
                    products,
                    categories,
                    toThousand,
                    toDiscount
                })
            })
            .catch(error => console.log(error))
    },


    productEdit: (req, res) => {
        let product = products.find(product => product.id === +req.params.id)
        return res.render('productEdit', {
            title: 'Editar producto', product,
        })
    },


    update: (req, res) => {
        const { name, price, discount, category, description } = req.body;
        let product = products.find(product => product.id === +req.params.id)
        let productModified = {
            id: +req.params.id,
            name: name,
            price: +price,
            discount: +discount,
            category,
            description: description,
            image: req.file ? req.file.filename : product.image

        }

        let productsModified = products.map(product => product.id === +req.params.id ? productModified : product)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsModified, null, 3), 'utf-8');
        res.redirect('/products/detail/' + req.params.id)
    },

    create: function (req, res) {
        db.Category.findAll()
            .then(categories => {
 //               return res.send(categories) 
                res.render('productAdd', {
                    categories
                }

                )
             
            })
          .catch( error => {
              console.log(error)
          })


    },


    store: (req, res) => {
        const errors = validationResult(req);
      //  return res.send(req.file)

        if (errors.isEmpty()) {
            const { name, description, price, discount, categoryId } = req.body
            db.Product.create({
                name,
                price,
                discount,
                description,
                image: req.file ? req.filename : 'default.jpg' ,
                categoryId,
            })

                .then(product => {
                    return res.redirect('/products/list')
                })
                .catch(error => console.log(error))

        } else {
            db.Category.findAll()
            .then(categories => {
 //               return res.send(categories) 
                res.render('productAdd', {
                    categories,
                    errors: errors.mapped(),
                    old: req.body
    
                }

                )
             
            })
          .catch( error => {
              console.log(error)
          })
        }


    },

    destroy: (req, res) => {

        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then ( () => {
            return res.redirect('/admin')
        })
        .catch(error => console.log(error)
        )}
       
      
}