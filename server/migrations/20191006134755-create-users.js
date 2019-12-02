'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING(64),
                unique: true,
                allowNull: false
            },
            handle: {
                type: Sequelize.STRING(64),
                unique: true,
                allowNull: false
            },
            password_hash: {
                type: Sequelize.STRING(164),
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
            },
            about_me: {
                type: Sequelize.TEXT(140)
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            ava_url: {
                type: Sequelize.STRING,
                allowNull: false
            },
            google_id: {
                type: Sequelize.STRING
            },
            google_token: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};