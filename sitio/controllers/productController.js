const fs = require('fs');
const path = require('path');

let products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));



module.exports = {
    detail : (req, res) => {
        return res.render('detalleProducto', { title: 'Detail'});
    },
    productEdit : (req,res) => {
        return res.render('productEdit',{
            title:'Editar producto', products,
        })
    },

    update: (req, res) => {
		const {name, price, discount, category, description} = req.body;
		let productModified = {
			id: +req.params.id,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category,
			description: description.trim(),
			image: 'default-image.png'
		}
		
		let productsModified = products.map(product => product.id === +req.params.id ? productModified : product)

        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productsModified,null,3),'utf-8');
		res.redirect('/products/detail/' + req.params.id)
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
        let productModified = products.filter(product => product.id !== +req.params.id);
        fs.writeFileSync(path.join(__dirname,'..','data','products.json'),JSON.stringify(productModified,null,3),'utf-8');
        res.redirect('/admin')
    }
}