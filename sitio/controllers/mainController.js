
const fs = require('fs');
const path = require('path');

const toDiscount = require('../utils/toDiscount');
const toThousand = require('../utils/toThousand');

const products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));

module.exports={
    index: (req,res) => { 
        return  res.render('index', { title: 'zukuna store',
        products,
        toThousand,
        toDiscount
    });

    },
    admin : (req,res) => {
        return res.render('admin',{
            title: 'Administración',
            products : JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8')),
             
        })
    },
    carrito : (req, res) => {
        return res.render('carrito')
    }
    
}