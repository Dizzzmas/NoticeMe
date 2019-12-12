'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('comment_likes', [{
            like: true,
            user_id: 1,
            comment_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                like: true,
                user_id: 2,
                comment_id: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                like: true,
                user_id: 1,
                comment_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                like: true,
                user_id: 2,
                comment_id: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                like: true,
                user_id: 3,
                comment_id: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {})
    },

    down: (queryInterface, Sequelize) => {
       return queryInterface.bulkDelete('comment_likes', null, {});
    }
};
