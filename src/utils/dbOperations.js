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

module.exports = { writeDB };
