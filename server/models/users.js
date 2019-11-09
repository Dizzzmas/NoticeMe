'use strict';
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        username: {
            type: DataTypes.STRING(64),
            unique: true,
            allowNull: false
        },
        passwordHash: {
            type: DataTypes.STRING(164),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        aboutMe: {
            type: DataTypes.TEXT(140),
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate(user, options) {
                const salt = bcrypt.genSaltSync();
                user.passwordHash = bcrypt.hashSync(user.passwordHash, salt);
            }
        }
    });
    users.associate = function (models) {
        users.hasMany(models.posts, {
            foreignKey: 'userId',
            as: 'posts',
        });
        users.hasMany(models.comments, {
            foreignKey: 'userId',
            as: 'comments'
        });
    };
    users.prototype.check_password = function (password, error) {
        if (error) {
            throw error;
        }
        return bcrypt.compareSync(password, this.passwordHash);
    };
    return users;
};