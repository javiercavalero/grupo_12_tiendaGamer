const fs = require('fs');
const path = require('path');

let products= JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));



module.exports = {
    detail : (req, res) => {
        return res.render('detalleProducto', { title: 'Detail'});
    },
    productEdit : (req,res) => {
        res.render('productEdit',{
            title:'Editar producto'
        })
    },

    create: (req, res) => {
		return res.render('productAdd',{
            title: 'agregar producto'
        })
    },

    store: (req, res) => {
        const {name, price, description, category} = req.body;
        let product = {
            id: products[products.length -1].id + 1,
            name,
            price: +price,
            description,
            category,
            image: 'default.jpg'
        }
        products.push(product)

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products, null,3), 'utf-8')
         res.redirect('/admin')
    },

    destroy: (req,res)=>{
        
    }
}