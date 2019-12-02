'use strict';
module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
        content: {
            type: DataTypes.TEXT(400),
            allowNull: false
        },
    }, {});
    comments.associate = function (models) {
        // associations can be defined here
        comments.belongsTo(models.posts, {
            foreignKey: 'post_id',
            onDelete: 'CASCADE',
        });
        comments.belongsTo(models.users, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        })
    };
    return comments;
};