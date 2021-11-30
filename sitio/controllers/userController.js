const path = require ("path");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const db = require('../database/models')
const {validationResult} = require('express-validator');
const { title } = require("process");

module.exports = {
  register : (req,res)=> {
    return res.render('register', {title: 'register'})
},

processRegister: async (req, res) => {
    let errors = validationResult(req);
    
    if(errors.isEmpty()){
        const {name, email, password, username} = req.body;
      db.User.create ({
            name : name.trim(),
            email : email.trim(),
            username: username.trim(),
            password : bcrypt.hashSync(password, 10),
            avatar : 'default.jpg',
            rolId : 1 
        })
        .then(user => {
          req.session.userLogin ={
            id: user.id,
            username: user.username,
            name: user.name,
            avatar:user.avatar ,
            rol:user.rolId
        }
         return res.redirect('/')
    }).catch(error => {
        console.log(error);
        })
    }else{
        return res.render('register', {
            title: 'register',
            errores : errors.mapped(),
            old: req.body
        })};
    },

login : (req,res)=> {
return res.render('login',{title:'login'})
},

processLogin: (req, res) => { 
let errors= validationResult(req);

if(errors.isEmpty()){

  db.User.findOne({
    where : { 
      email : req.body.email
  }
  }).then(user => {
req.session.userLogin ={
    id: user.id,
    username: user.username,
    name: user.name,
    avatar:user.avatar ,
    rol:user.rolId
}
if(req.body.remember){
    res.cookie('zukuna',
    req.session.userLogin,
    {maxAge: 6000 })
}

return res.redirect('/')
  })}else{

    return res.render('login',{
        title: 'login',
    errores : errors.mapped()
})
}
},


logout: (req, res) => {
    if(req.session){
        req.session.destroy()
        res.cookie('zukuna',
        '',
        {maxAge: -1 })
    }
    res.redirect('/')  
},



profile :async (req,res) =>
 { let errors= validationResult(req);
   /*  return res.send(errors) */
    if(errors.isEmpty()){
        try {
         let user = await db.User.findByPk(req.session.userLogin.id)
         return res.render('profile', {
                user: user})

    }
     catch(error) {
                console.log(error);
    }
}else {
    return res.render('profile', {
        errores : errors.mapped()
    })

    }
    
}}
