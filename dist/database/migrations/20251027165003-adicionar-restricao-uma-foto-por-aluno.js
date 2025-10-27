"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('fotos', {
      fields: ['aluno_id'],
      type: 'unique',
      name: 'unique_foto_por_aluno'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('fotos', 'unique_foto_por_aluno');
  }
};
