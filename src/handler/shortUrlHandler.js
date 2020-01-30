const shortHash = require('short-hash');
const { writeDB } = require('../utils/dbOperations');

const createShortUrl = async (request, h) => {
  try {
    const { longUrl } = request.payload;
    const result = shortHash(longUrl);

    const shortUrl = `http://localhost:8080/${result}`;
    const urlMapping = {
      longUrl, shortUrl,
    };
    await writeDB(urlMapping);
    return h.response(shortUrl).code(200);
  } catch (err) {
    return h.response('Unable to generate short url').code(500);
  }
};

const redirectUrl = async (request, h) => {

};

module.exports = { createShortUrl, redirectUrl };
