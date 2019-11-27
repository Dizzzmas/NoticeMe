'use strict';
module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define('posts', {
        content: {
            type: DataTypes.TEXT(400),
            allowNull: false,
        },
        imageUri: {
            type: DataTypes.STRING(100),
            defaultValue: '/data/fs/no_file_available.png',
            allowNull: false
        }
    }, {});
    posts.associate = function (models) {
        // associations can be defined here
        posts.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        posts.hasMany(models.comments, {
            foreignKey: 'postId',
            as: 'comments'
        });
         posts.hasMany(models.likes, {
            foreignKey: 'postId',
            as: 'likes'
        });

    };
    return posts;
};