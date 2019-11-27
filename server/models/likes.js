'use strict';
module.exports = (sequelize, DataTypes) => {
    const likes = sequelize.define('likes', {
        like: {
            type: DataTypes.BOOLEAN
        }
    }, {});
    likes.associate = function (models) {
        likes.belongsTo(models.users, {
            through: 'likes',
            onDelete: 'CASCADE',
            foreignKey: 'userId'
        });
        likes.belongsTo(models.posts, {
            through: 'likes',
            onDelete: 'CASCADE',
            foreignKey: 'postId'
        });
    };
    return likes;
};