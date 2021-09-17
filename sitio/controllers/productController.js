module.exports = {
    detail : (req, res) => {
        return res.render('detalleProducto', { title: 'detail'});
    },
    productAdd : (req, res) => {
        return res.render('productAdd')
    }
}