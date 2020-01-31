const shortHash = require('short-hash');

const dbOperations = require('../utils/dbOperations');

const createShortUrl = async (request, h) => {
  try {
    const { longUrl } = request.payload;
    const shortUrlHash = shortHash(longUrl);

    const expiresat = Date.now() + 1800000;

    const shortUrl = `http://localhost:8080/${shortUrlHash}`;
    const urlMapping = {
      longUrl, shortUrl: shortUrlHash, expiresat,
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

    const longUrlObject = await dbOperations.getLongUrl(shortUrl);
    if (longUrlObject.length === 0) {
      return h.response(`${shortUrl} not found`).code(404);
    }
    const { expiresat } = longUrlObject[0];
    const currentTime = Date.now();
    if ((currentTime - expiresat) < 0) {
      return h.redirect(longUrlObject[0].longUrl);
    }
    return h.response(`${shortUrl} has expired: GONE`).code(410);
  } catch (err) {
    return h.response('Error in redirecting').code(500);
  }
};

module.exports = { createShortUrl, redirectUrl };
