'use strict';

const port = process.env.PORT || 8000
const Hapi = require('hapi');
const Boom = require('boom')
const server = new Hapi.Server();
server.connection({ 
  host: 'localhost', 
  port: port 
});

function handle(command) {
  return function (request, reply) {
    seneca.act(command, function(err, response, microservice) {
      if(err)
        return reply(Boom.serverTimeout(err))
      
      reply({
        _microservice: microservice,
        organisations: response
      });
    })
  }
}

server.route({
  method: 'GET',
  path:'/organisations', 
  handler: handle('cmd:listOrganisations')
});

server.route({
  method: 'GET',
  path:'/organisation',
  handler: handle('cmd:getOrganisation')
});

var seneca = require('seneca')()
.use('mesh', {base: true, silent:true})
.ready(function() {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
})
