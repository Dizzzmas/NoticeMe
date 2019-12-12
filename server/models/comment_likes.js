'use strict';
module.exports = (sequelize, DataTypes) => {
    const comment_likes = sequelize.define('comment_likes', {
        like: {type: DataTypes.BOOLEAN}
    }, {});
    comment_likes.associate = function (models) {

      comment_likes.belongsTo(models.users, {
            through: 'comment_likes',
            onDelete: 'CASCADE',
            foreignKey: 'user_id'
        });
        comment_likes.belongsTo(models.posts, {
            through: 'comment_likes',
            onDelete: 'CASCADE',
            foreignKey: 'comment_id'
        });
        // associations can be defined here
    };
    return comment_likes;
};