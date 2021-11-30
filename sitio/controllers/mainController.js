const toDiscount = require("../utils/toDiscount");
const toThousand = require("../utils/toThousand");
const db = require("../database/models");

module.exports = {
  index: (req, res) => {
    let products = db.Product.findAll({
      limit: 8,
      include: ["Category"],
    }).then((products) => {
      return res.render("index", {
        products,
        toThousand,
        toDiscount,
      });
    });
  },

  admin: (req, res) => {
    let products = db.Product.findAll({
      include: ["Category"],
    });
    let categories = db.Category.findAll();

    Promise.all([products, categories])
      .then(([products, categories]) => {
        return res.render("admin", {
          title: "Admin",
          products,
          categories,
        });
      })
      .catch((error) => console.log(error));
  },

  carrito: (req, res) => {
    return res.render("carrito");
  },
};
