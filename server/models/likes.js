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
            foreignKey: 'user_id'
        });
        likes.belongsTo(models.posts, {
            through: 'likes',
            onDelete: 'CASCADE',
            foreignKey: 'post_id'
        });
    };
    return likes;
};