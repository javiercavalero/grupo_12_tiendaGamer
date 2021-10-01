const fs= require ('fs');
const path= require('path');
let products= JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));

module.exports = {
    detail: (req,res)=> {
        res.render('detalleProducto',{ 
        title:'detail',
      product: products.find(products => products.id === +req.params.id)
         })},
    productAdd : (req, res) => {
        return res.render('productAdd',{
            title:'Agregar producto'
        })
    },
    productEdit : (req,res) => {
        res.render('productEdit',{
            title:'Editar producto'
        })
    },
    destroy: (req,res)=>{
        
    }
}