'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    

      return queryInterface.bulkInsert('Documents', 
      [{name: 'My first Fizzbuzz', content: 'I am using JavaScript!', OwnerId: 1, language: "JavaScript", createdAt: new Date(), updatedAt: new Date()},
      {name: 'Learning how to Ruby', content: 'I miss PHP', OwnerId: 2, language: "Ruby", createdAt: new Date(), updatedAt: new Date()},
      {name: 'Github collab project', content: 'Do not code on master', OwnerId: 3, language: "Python", createdAt: new Date(), updatedAt: new Date()}]
      );
  },

  down: function (queryInterface, Sequelize) {
    
      return queryInterface.bulkDelete('Documents', null, {});
    
  }
};
