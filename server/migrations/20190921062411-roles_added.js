'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Users',
                'role', {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: false,
                }
            ),
            queryInterface.changeColumn(
                'Users',
                'email', {
                    type: Sequelize.STRING(128),
                    allowNull: false,
                    unique: true,
                }
            )]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'Users',
                'role',
            ),
            queryInterface.changeColumn(
                'Users',
                'email', {
                    type: Sequelize.STRING(128),
                    allowNull: false,
                    unique: false,
                }
            )
        ]);
    }
};
