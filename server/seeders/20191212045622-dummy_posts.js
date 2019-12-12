'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [{
        content: 'Nice weather today',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
         content: 'How ya doing guys ?',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
         content: 'Wassup lads ?',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
         content: 'Keep on keeping on',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
         {
         content: 'Lol dude, u r writing React code ROFLMAO',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};
