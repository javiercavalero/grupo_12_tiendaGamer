'use strict';

let products = require('../../data/products.json')

let categoriesJson = require('../../data/categories.json')

let categories = ['nuevo', 'gratis', 'oferta'];

let id = 1

products.forEach(product => {
  categoriesJson.forEach(category => {
    let item = {
      ...category,
      id,
      productId: product.id,
      createdAt: new Date,
      updatedAt: new Date
    }
    categories.push(item)
    id++
  })
})


module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Categories', null, {});
  }
};
