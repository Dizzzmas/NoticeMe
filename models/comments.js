'use strict';
module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
        content: {
            type: DataTypes.TEXT(400),
            allowNull: false
        },
        commenterUsername: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
    }, {});
    comments.associate = function (models) {
        // associations can be defined here
        comments.belongsTo(models.posts, {
            foreignKey: 'postId',
            onDelete: 'CASCADE',
        });
        comments.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        })
    };
    return comments;
};