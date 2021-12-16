'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(8,2),
        allowNull: false
      },
     discount: {
        type: Sequelize.DECIMAL(8,2),
        allowNull: false,
        defaultValue: 0
     },

      description: {
        type: Sequelize.STRING(600),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(255)
      },
      categoryId: {
        type: Sequelize.INTEGER,
        /* allowNull: false, */
        references: {
          model:{
            tableName: 'Categories'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};