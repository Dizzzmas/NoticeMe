'use strict';
module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define('posts', {
        content: {
            type: DataTypes.TEXT(400),
            allowNull: false,
        },
    }, {});
    posts.associate = function (models) {
        // associations can be defined here
        posts.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE'
        });
        posts.hasMany(models.comments, {
            foreignKey: 'post_id',
            as: 'comments'
        });
        posts.hasMany(models.likes, {
            foreignKey: 'post_id',
            as: 'likes'
        });
        posts.hasMany(models.post_images, {
            foreignKey: 'post_id',
            as: 'images'
        });


    };
    return posts;
};