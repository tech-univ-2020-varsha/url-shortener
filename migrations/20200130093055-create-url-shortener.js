
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('urlShorteners', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    longUrl: {
      type: Sequelize.TEXT,
    },
    shortUrl: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('urlShorteners'),
};
