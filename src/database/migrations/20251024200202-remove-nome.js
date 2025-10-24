'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.removeColumn('fotos', 'nome');
  },

   async down (queryInterface, Sequelize) {
    return queryInterface.addColumn('fotos', 'nome', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
}
