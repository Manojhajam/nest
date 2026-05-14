'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('news_details', 'newsId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true, // 👈 makes it 1-to-1
      references: {
        model: 'news',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('news_details', 'newsId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'news',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};