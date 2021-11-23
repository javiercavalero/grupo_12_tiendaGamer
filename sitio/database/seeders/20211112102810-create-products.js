'use strict';
var faker = require('faker');

let products = require('../../data/products.json')

let productos = products.map ( product =>{
  let item = {
    ...product,
    createdAt: new Date,
    updatedAt: new Date,
    categoryId: faker.datatype.number({
      min: 1,
      max: 3
    })
  }
  return item
})


module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Products', productos, {});
    
  },

  down: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkDelete('Products', null, {});
     
  }
};
