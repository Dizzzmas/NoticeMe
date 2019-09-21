const bcrypt = require('bcrypt');
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {

        username: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        about_me: {
            type: DataTypes.STRING(140),
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    }, {
        hooks: {
            beforeCreate(user, options) {
                const salt = bcrypt.genSaltSync();
                user.password_hash = bcrypt.hashSync(user.password_hash, salt);
            }
        },

    });
    Users.associate = (models) => {
        // associations can be defined here
        Users.hasMany(models.Posts, {
            foreignKey: 'user_id',
            as: 'posts',
        });
    };


    Users.prototype.check_password = function (password, error) {
        console.log(this.password_hash);
        console.log(password);
        if (error) {
            throw error;
        }
        return bcrypt.compareSync(password, this.password_hash);
    };

    return Users;
};