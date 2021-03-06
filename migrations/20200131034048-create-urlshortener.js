
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('urlshorteners', {
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
    expiresat: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('urlshorteners'),
};
