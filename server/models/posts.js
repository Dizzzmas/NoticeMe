'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    body: {
      type:DataTypes.STRING(140),
      allowNull: false,
    }
  }, {});
  Posts.associate = (models) => {
    // associations can be defined here
    Posts.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Posts;
};