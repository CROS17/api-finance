'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('type_payments',[
      { description: 'Efectivo', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Yape', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Plin', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Tarjeta Credito', createdAt: new Date(), updatedAt: new Date() },
      { description: 'Deposito', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('type_payments', null, {});
  },
};
