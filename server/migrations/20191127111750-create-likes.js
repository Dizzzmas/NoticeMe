'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('likes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            like: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'users',
                    key: 'id',
                    as: 'userId'
                }
            },
          postId: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
              model: 'posts',
              key: 'id',
              as: 'postId'
            }
          }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('likes');
    }
};