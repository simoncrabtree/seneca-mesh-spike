const port = process.env.PORT || 30001
const Hapi = require('hapi')
const Boom = require('boom')
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: port
})

server.route({
  method: 'GET',
  path: '/forms',
  handler: function(request, reply) {
    reply({forms: []})
  }
})

server.start()