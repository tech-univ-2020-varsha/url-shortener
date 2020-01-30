const { createShortUrl, redirectUrl } = require('../handler/shortUrlHandler');

const urlShortnerRoutes = [
  { path: '/createShortUrl', method: 'POST', handler: createShortUrl },
  {
    path: '/{urlhash}', method: 'GET', handler: redirectUrl,
  },
];

module.exports = urlShortnerRoutes;
