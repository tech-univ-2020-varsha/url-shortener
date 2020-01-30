'use strict';
module.exports = (sequelize, DataTypes) => {
  const urlShortener = sequelize.define('urlShortener', {
    longUrl: DataTypes.TEXT,
    shortUrl: DataTypes.TEXT
  }, {});
  urlShortener.associate = function(models) {
    // associations can be defined here
  };
  return urlShortener;
};