'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('followers', [{
            follower_id: 1,
            followed_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                follower_id: 3,
                followed_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                follower_id: 2,
                followed_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                follower_id: 3,
                followed_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                follower_id: 3,
                followed_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('followers', null, {});
    }
};
