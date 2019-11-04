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
            passwordHash: {
                type: Sequelize.STRING(164),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(128),
                allowNull: false,
                unique: true,
            },
            aboutMe: {
                type: Sequelize.TEXT(140)
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
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