'use strict';

let categoryJSON = require('../../data/categories.json');

let categories = categoryJSON.map (category => {
 let item = {
     ...category,
     createdAt: new Date(),
 }   
 return item;
})


module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Categories', null, {});
  }
};
