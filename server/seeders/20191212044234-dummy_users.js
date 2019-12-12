'use strict';
const md5 = require('md5');
const utf8 = require('utf8');

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('users', [{
        username: 'Dizzzmas',
        email: 'hailrake736@gmail.com',
        handle: '@Dizzzmas',
        password_hash: '$2b$10$QPO5sPohiuKfl1vXXyheZuhTag9/uURZ1FppnWZ9zNj.nYKgcz5pu',
        ava_url: `https://www.gravatar.com/avatar/${md5(utf8.encode('hailrake@gmail.com'))}?d=identicon`,
        about_me: 'Dizzzmas the Creator',
        verified: true,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
   {
        username: 'FLAIN',
        email: 'flain736@gmail.com',
        handle: '@FLAIN',
        password_hash: '$2b$10$nO3k4j3yGRhLh2V4m9Xoo.NiOMFy0wWd8M/21N1JEiBcgCc6pAJDu',
        ava_url: `https://www.gravatar.com/avatar/${md5(utf8.encode('flain@gmail.com'))}?d=identicon`,
        about_me: 'Thanks for making it possible, mate',
        verified: true,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        username: 'Ilya',
        email: 'ilyuha@gmail.com',
        handle: '@Ilya',
        password_hash: '$2b$10$IiU7lceSC3Vzk34DtPpTJ.JkZLW87DchDq0EgVgO3Hs0/uKDjRtJm',
        ava_url: `https://www.gravatar.com/avatar/${md5(utf8.encode('ilyuha@gmail.com'))}?d=identicon`,
        about_me: 'The 3rd apostle of React',
        verified: true,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('users', null, {});
  }
};
