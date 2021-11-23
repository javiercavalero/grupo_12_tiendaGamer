const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));

const toThousand = require('../utils/toThousand');
const toDiscount = require('../utils/toDiscount');

/* validaciones */
const{validationResult}= require('express-validator');

module.exports = {
    detail : (req, res) => {
        return res.render('detalleProducto', { title: 'Detail', 
        products,
        product : products.find(product => product.id === +req.params.id)}
        );
    },
    productEdit : (req,res) => { 
        let product = products.find(  product => product.id === +req.params.id )
        return res.render('productEdit',{
            title:'Editar producto', product,
        })
    },

       
    update: (req, res) => {
		const {name, price, discount, category, description} = req.body;
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

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8');
		res.redirect('/products/detail/' + req.params.id)
	},

    create: function (req, res) {
           const {name,description,price,discount,categoryId} = req.body
           db.Product.create({
           name,
           price,
           discount,
           description,
           image,
           categoryId,
        })
       
        .then( Product => {
            return res.redirect('/products')
        })
        .catch(error => console.log(error))
        
    },


    store: (req, res) => {
        const errors=validationResult(req);

        if(errors.isEmpty()){
 const {name, price, description, category, discount} = req.body;
        let product = {
            id: products[products.length -1].id + 1,
			name:name,
            price:+price,
            discount: +discount,
			description: description,
            category,
            image: req.file ? req.file.filename : 'default.jpg'
        }
        products.push(product)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null,3), 'utf-8')
         res.redirect('/admin')
        }else{
            return res.render('productAdd',{
                title: 'Crear producto',
                errors : errors.mapped(),
                old:req.body
            })
        }

       
    },

    destroy: (req,res)=>{
        let productModified = products.filter(product => product.id !== +req.params.id);
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productModified,null,3),'utf-8');
        res.redirect('/admin')
    }
}