const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const {
  validationResult
} = require("express-validator");
const {
  title
} = require("process");
const {
  log
} = require("console");

/* BASE DE DATOS */
const db = require("../database/models");
const {
  Op
} = require("sequelize");

module.exports = {

  register: (req, res) => {
    return res.render("register", {
      title: "register",
    });
  },
  processRegister: async (req, res) => {
    let errors = validationResult(req);
    const {name,email,username,password} = req.body;
    try {
      let usersExist = await db.User.findOne({
        where: {
          email: email
        }
      })
      if (usersExist) {
        return res.render("register", {
          title: "register",
          errors: {
            email: "El email ya existe"
          }
        });
      } 
      
      let user = await db.User.create({
        name: name.trim(),
        email: email.trim(),
        username: username.trim(),
        password: bcrypt.hashSync(password, 10)
      })
      req.session.user = {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        rol: user.rol,
      };
      return res.render("register", {
          title: "register",
          errores: errors.mapped(),
          old: req.body,
        });
    } catch (error) {
      console.log(error);
    }
    return res.redirect("/");
    //----------------------------------------------------------------------------


    if (errors.isEmpty()) {
      /*   let user = {
         id: users.length != 0 ? users[users.length - 1].id + 1 : 1,
         name: name.trim(),
         email: email.trim(),
         username: username.trim(),
         password: bcrypt.hashSync(password, 10)
       }; 
       users.push(user);
       fs.writeFileSync(
         path.join(__dirname, "../data/users.json"),
         JSON.stringify(users, null, 3),
         "utf-8"
       ); 
       res.redirect("/"); */
    } else {
      return res.render("register", {
        title: "register",
        errores: errors.mapped(),
        old: req.body,
      });
    }
  },

  login: (req, res) => {
    return res.render("login", {
      title: "login",
    });
  },

  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let user = users.find((user) => user.email === req.body.email);
      req.session.userLogin = {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        rol: user.rol,
      };
      if (req.body.remember) {
        res.cookie("zukuna", req.session.userLogin, {
          maxAge: 60000,
        });
      }

      return res.redirect("/");
    } else {
      return res.render("login", {
        title: "login",
        errores: errors.mapped(),
      });
    }
  },


  logout: (req, res) => {
    if (req.session) {
      req.session.destroy();
      res.cookie("zukuna", "", {
        maxAge: -1,
      });
    }
    res.redirect("/");
  },

  profile: (req, res) => {
    let users = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8")
    );
    return res.render("profile", {
      user: users.find((user) => user.id === req.session.userLogin.id),
    });
  },
};