'use strict'

const port = process.env.PORT || 8000
const Hapi = require('hapi')
const Boom = require('boom')
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: port
})

function handle(command) {
  return function (request, reply) {
    seneca.act(command, request.payload, function(err, response, microservice) {
      if(err)
        return reply(Boom.serverTimeout(err))
      
      reply({
        _microservice: microservice,
        response: response
      })
    })
  }
}

function addRoute(method, path, pattern) {
  server.route({
    method: method,
    path: path,
    handler: handle(pattern)
  })
}

addRoute('GET', '/organisations', 'cmd:listOrganisations')
addRoute('GET', '/organisation', 'cmd:getOrganisation')
addRoute('POST', '/organisation', 'cmd:createOrganisation')
addRoute('GET', '/users', 'cmd:listUsers')

var seneca = require('seneca')()
.use('mesh', {base: true, silent:true})
.ready(function() {
  server.start((err) => {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
})
