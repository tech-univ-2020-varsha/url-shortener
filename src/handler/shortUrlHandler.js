const shortHash = require('short-hash');

const dbOperations = require('../utils/dbOperations');

const createShortUrl = async (request, h) => {
  try {
    const { longUrl } = request.payload;
    const shortUrlHash = shortHash(longUrl);

    const shortUrl = `http://localhost:8080/${shortUrlHash}`;
    const urlMapping = {
      longUrl, shortUrl: shortUrlHash,
    };
    await dbOperations.writeDB(urlMapping);
    return h.response(shortUrl).code(200);
  } catch (err) {
    return h.response('Unable to generate short url').code(500);
  }
};

const redirectUrl = async (request, h) => {
  try {
    const shortUrl = request.params.urlhash;

    const longUrl = await dbOperations.getLongUrl(shortUrl);

    return h.redirect(longUrl);
  } catch (err) {
    return h.response('Error in redirecting').code(500);
  }
};

module.exports = { createShortUrl, redirectUrl };
