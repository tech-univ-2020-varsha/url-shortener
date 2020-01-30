const hapi = require('@hapi/hapi');
const urlShortnerRoutes = require('./src/routes/urlShortnerRoutes');

const server = hapi.Server({
  host: 'localhost',
  port: 8080,
});
server.route(urlShortnerRoutes);
module.exports = { server };
