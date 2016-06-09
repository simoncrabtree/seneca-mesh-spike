'use strict'

const port = process.env.PORT || 8000
const Hapi = require('hapi')
const Boom = require('boom')
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: port
})

server.register({
  register: require('h2o2')
})

function handle(command) {
  return function (request, reply) {
    seneca.act(command, request.payload || request.params, function(err, response, microservice) {
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
addRoute('GET', '/users/{id}', 'cmd:findUser')
addRoute('POST', '/users', 'cmd:registerUser')

server.route({
  method: 'GET',
  path: '/forms',
  handler: function(request, reply) {
    return reply.proxy({host: 'localhost', port: 30001, protocol: 'http'})
  }
})

var seneca = require('seneca')({tag: 'api-gateway', silent: false})
.use('mesh', {})
.ready(function() {
  server.start((err) => {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
})
