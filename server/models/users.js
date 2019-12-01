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
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        aboutMe: {
            type: DataTypes.TEXT(140),
        },
        avaUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        googleId: {
            type: DataTypes.STRING
        },
        googleToken: {
            type: DataTypes.STRING
        },
    }, {
        hooks: {
            beforeCreate(user, options) {
                if (user.passwordHash) {
                    const salt = bcrypt.genSaltSync();
                    user.passwordHash = bcrypt.hashSync(user.passwordHash, salt);
                }
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
        users.belongsToMany(models.users, {
            as: 'following',
            foreignKey: 'follower_id',
            through: 'followers'
        });
        users.belongsToMany(models.users, {
            as: 'followed_by',
            foreignKey: 'followed_id',
            through: 'followers'
        })

    };
    users.prototype.check_password = function (password, error) {
        if (error) {
            throw error;
        }
        return bcrypt.compareSync(password, this.passwordHash);
    };
    return users;
};