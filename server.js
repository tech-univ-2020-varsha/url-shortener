const hapi = require('@hapi/hapi');


const server = hapi.Server({
  host: 'localhost',
  port: 8080,
});

module.exports = { server };
