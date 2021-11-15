'use strict';

let products = require('../../data/products.json')

let productos = products.map ( product =>{
  let item = {
    ...product,
    createdAt: new Date,
    updatedAt: new Date
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
