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

    edit: (req, res) => {
        let product = db.Product.findByPk(req.params.id)
        let categories = db.Category.findAll()

        Promise.all([product,categories])

        .then(([product,categories]) => {
          // return res.send(product) 
            return res.render('productEdit', {
                product,
                categories
            })

        })
        .catch(error => console.log(error))
},


    update: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) { 
            
            const { name, description, price, discount, category } = req.body;
           
            db.Product.findByPk(req.params.id) 
            .then(product => {
                db.Product.update(
                    {
                        name : name.trim(),
                        description : description.trim(),
                        price,
                        discount,
                        categoryId : category,
                        image: req.file ? req.file.filename: product.image
                    },
                    {
                        where : {
                            id : req.params.id
                        }
                    }
                )
                    .then( () => {
                        return res.redirect('/admin')
                    })
                    .catch(error=>console.log(error))
            }) 
            .catch(error=>console.log(error))
            


        } else {

            let product = db.Product.findByPk(req.params.id)
            let categories = db.Category.findAll()
    
            Promise.all([product,categories])
    
            .then(([product,categories]) => {
                return res.render('productEdit', {
                    categories,
                    product,
                    errors: errors.mapped(),
                })
            })
            .catch(error => console.log(error))

        }

    },

    create: (req, res) => {

        db.Category.findAll()
            .then(categories => {
                return res.render('productAdd', {
                    categories
                })
            })
            .catch(error => console.log(error))
        },


    store: (req, res) => {
        const errors = validationResult(req);
      //  return res.send(req.file)
        if (errors.isEmpty()) {
            const { name, description, price, discount, category } = req.body
           
            db.Product.create({
                name,
                price,
                discount,
                description,
                image: req.file ? req.file.filename : 'default.jpg' ,
                categoryId: category
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