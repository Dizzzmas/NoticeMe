'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('followers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key:'id',
                    as:'followerId'
                }
      },
      followedId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key:'id',
                    as:'followedId'
                }
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
    return queryInterface.dropTable('followers');
  }
};