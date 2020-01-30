const urlShortenerSequelize = require('../../models/index');


const writeDB = async (urlMapping) => {
  try {
    const result = await urlShortenerSequelize.urlShortener.create({
      longUrl: urlMapping.longUrl,
      shortUrl: urlMapping.shortUrl,
    });

    return result;
  } catch (error) {
    return 'unable to insert data to db';
  }
};

const getLongUrl = async (shortUrl) => {
  try {
    const result = await urlShortenerSequelize.urlShortener.findAll({
      where: {
        shortUrl,
      },
    });
    return result;
  } catch (error) {
    return 'unable to retreive url from the db';
  }
};

module.exports = { writeDB, getLongUrl };
