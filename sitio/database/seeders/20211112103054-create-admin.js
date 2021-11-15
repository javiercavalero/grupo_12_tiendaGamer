'use strict';
const bcrypt = require('bcryptjs');


module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Users', [{
        name: 'Admin',
        email: 'random@gmail.com',
        password : bcrypt.hashSync('123456789',10),
        avatar: 'default.jpg',
        rolId: 6,
        createdAt: new Date,
        updatedAt: new Date
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

      await queryInterface.bulkDelete('Users', null, {});

  }
};
