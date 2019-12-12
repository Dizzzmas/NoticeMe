'use strict';
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        username: {
            type: DataTypes.STRING(64),
            unique: true,
            allowNull: false
        },
        handle: {
            type: DataTypes.STRING(64),
            unique: true,
            allowNull: false
        },
        password_hash: {
            type: DataTypes.STRING(164),
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        about_me: {
            type: DataTypes.TEXT(140),
        },
        ava_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        google_id: {
            type: DataTypes.STRING
        },
        google_token: {
            type: DataTypes.STRING
        },
    }, {
        hooks: {
            beforeCreate(user, options) {
                if (user.password_hash) {
                    const salt = bcrypt.genSaltSync();
                    user.password_hash = bcrypt.hashSync(user.password_hash, salt);
                }
            }
        }
    });
    users.associate = function (models) {
        users.hasMany(models.posts, {
            foreignKey: 'user_id',
            as: 'posts',
        });
        users.hasMany(models.comments, {
            foreignKey: 'user_id',
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
        return bcrypt.compareSync(password, this.password_hash);
    };
    return users;
};