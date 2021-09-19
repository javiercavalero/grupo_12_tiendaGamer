module.exports = {
    detail : (req, res) => {
        return res.render('detalleProducto', { title: 'Detail'});
    },
    productAdd : (req, res) => {
        return res.render('productAdd',{
            title:'Agregar producto'
        })
    },
    productEdit : (req,res) => {
        res.render('productEdit',{
            title:'Editar producto'
        })
    }
}