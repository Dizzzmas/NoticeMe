'use strict';
module.exports = (sequelize, DataTypes) => {
  const followers = sequelize.define('followers', {
    followerId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER
  }, {});
  followers.associate = function(models) {
    // associations can be defined here

  };
  return followers;
};
