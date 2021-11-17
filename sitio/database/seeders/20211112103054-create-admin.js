'use strict';
const bcrypt = require('bcryptjs');
let usersJSON = require('../../data/users.json');

let users = usersJSON.map (user => {
 let item = {
     ...user,
     createdAt: new Date(),
 }   
 return item;
})

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Users',users , {});
    
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Users', null, {});

  }
};
