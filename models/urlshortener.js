
module.exports = (sequelize, DataTypes) => {
  const urlshortener = sequelize.define('urlshortener', {
    longUrl: DataTypes.TEXT,
    shortUrl: DataTypes.TEXT,
  }, {});
  urlshortener.associate = function (models) {
    // associations can be defined here
  };
  return urlshortener;
};
