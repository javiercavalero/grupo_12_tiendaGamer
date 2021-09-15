module.exports={
    index: (req,res) => { 
        return  res.render('index', { title: 'zukuna store'});

    },
    admin:(req,res)=>{
        return res.render('admin',{
            title: 'admin'
        })
    }
}