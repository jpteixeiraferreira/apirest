'use strict'
const bcrypt = require('bcryptjs');
const { UPDATE } = require('sequelize/lib/query-types')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Teste 4',
          email: 'teste4@teste4.com',
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Teste 5',
          email: 'teste5@teste5.com',
          password_hash: await bcrypt.hash('123123', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Teste 6',
          email: 'teste6@teste6.com',
          password_hash: await bcrypt.hash('000000', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    )
  },

  async down () {}
}
