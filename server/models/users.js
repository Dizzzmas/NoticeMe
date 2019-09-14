'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {

    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    about_me: {
      type: DataTypes.STRING(140),
    }
  }, {});
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Posts, {
      foreignKey: 'user_id',
      as: 'posts',
    })
  };
  return Users;
};