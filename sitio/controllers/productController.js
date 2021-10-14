const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));

const toThousand = require('../utils/toThousand');
const toDiscount = require('../utils/toDiscount');


module.exports = {
    detail : (req, res) => {
        return res.render('detalleProducto', { title: 'Detail', 
        products,
        product : products.find(product => product.id === +req.params.id)}
        );
    },
    productEdit : (req,res) => {
        res.render('productEdit',{
            title:'Editar producto'
        })
    },

    create: (req, res) => {
		return res.render('productAdd',{
            title: 'Crear producto'
        })
    },

    store: (req, res) => {
        const {name, price, description, category} = req.body;
        let product = {
            id: products[products.length -1].id + 1,
			name: name.trim(),
            price: +price,
            discount: +discount,
			description: description.trim(),
            category,
            image: 'default.jpg'
        }
        products.push(product)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null,3), 'utf-8')
         res.redirect('/admin')
    },

    destroy: (req,res)=>{
        let productModified = products.filter(product => product.id !== +req.params.id);
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productModified,null,3),'utf-8');
        res.redirect('/admin')
    }
}