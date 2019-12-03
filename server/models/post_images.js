'use strict';
module.exports = (sequelize, DataTypes) => {
    const post_images = sequelize.define('post_images', {
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        public_id: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});
    post_images.associate = function (models) {
        // associations can be defined here
        post_images.belongsTo(models.posts, {
            foreignKey: 'post_id',
            onDelete: 'CASCADE',
        });
    };
    return post_images;
};