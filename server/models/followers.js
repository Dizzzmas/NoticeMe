'use strict';
module.exports = (sequelize, DataTypes) => {
  const followers = sequelize.define('followers', {
    follower_id: DataTypes.INTEGER,
    followed_id: DataTypes.INTEGER
  }, {});
  followers.associate = function(models) {
    // associations can be defined here

  };
  return followers;
};
