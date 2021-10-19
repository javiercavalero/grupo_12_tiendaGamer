const path = require ("path");
const bcrypt = require('bcryptjs');
const fs = require('fs');
let users = require(path.join(__dirname, '../data/users.json'));
const {validationResult} = require('express-validator');
const { title } = require("process");

module.exports = {
login : (req,res)=> {
return res.render('login',{title:'login'})
},

processLogin: (req, res) => { 
let errors= validationResult(req);

if(errors.isEmpty()){
let user= users.find(user => user.email === req.body.email);
req.session.userLogin ={
    id: user.id,
    name: user.name,
    avatar:user.avatar ,
    rol:user.rol
}
return res.redirect('/')
}else{

    return res.render('login',{
        title: 'login',
    errores : errors.mapped()
})
}
},


register : (req,res)=> {
    return res.render('register', {title: 'register'})


},
processRegister: (req, res) => {
    let errors = validationResult(req);
    
    if(errors.isEmpty()){
        const {name, email, password, username} = req.body;
        let user = {
            id : users.length != 0 ? users[users.length - 1].id + 1 : 1,
            name : name.trim(),
            email : email.trim(),
            username: username.trim(),
            password : bcrypt.hashSync(password, 10),
            avatar : 'default.jpg',
            rol: "user"
        }
        users.push(user);
        fs.writeFileSync(path.join(__dirname, '../data/users.json'),JSON.stringify(users, null, 3), 'utf-8')
        res.redirect('/')
    }else{
        return res.render('register', {
            title: 'register',
            errores : errors.mapped(),
            old : req.body
        })
    }


}

}
