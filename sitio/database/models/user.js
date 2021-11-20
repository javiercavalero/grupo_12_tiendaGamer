'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol, {
        as: 'rol',
        foreignKey: 'rolId'
    }),
    User.belongsToMany(models.Product, {
<<<<<<< HEAD
      as: 'Product',
      through : 'ProductUsers',
      foreignKey: 'userId',
      otherKey : 'productId'
=======
      as: 'user',
      through : 'productUsers',
      foreignKey: 'productId',
      otherKey : 'userId'
>>>>>>> ca794116b5fb54beaf4fe32c2460cc29eac44721
  })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};