'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add column (nullable first)
    await queryInterface.sequelize.query(`
      ALTER TABLE news
      ADD COLUMN if not exists slug VARCHAR(255);
    `);

    // 2. Backfill existing rows
    await queryInterface.sequelize.query(`
      UPDATE news
      SET slug = CONCAT('news-', id)
      WHERE slug IS NULL;
    `);

    // 3. Set NOT NULL constraint
    await queryInterface.sequelize.query(`
      ALTER TABLE news
      ALTER COLUMN slug SET NOT NULL;
    `);

    // 4. Add UNIQUE constraint
    await queryInterface.sequelize.query(`
      ALTER TABLE news
      ADD CONSTRAINT news_slug_unique UNIQUE (slug);
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE news
      DROP CONSTRAINT IF EXISTS news_slug_unique;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE news
      DROP COLUMN slug;
    `);
  }
};