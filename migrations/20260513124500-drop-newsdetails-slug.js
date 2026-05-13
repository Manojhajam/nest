'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE news_details
      DROP COLUMN IF EXISTS slug;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE news_details
      ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
    `);
  }
};