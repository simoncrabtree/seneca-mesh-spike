var commands = {
  'cmd:listUsers': function(msg, done) {
    done(null, {users: [{id:1, name:'Steve'}, {id:2, name:'Andrew'}]})
  },
  'cmd:findUser': function(msg, done) {
    this.act('cmd:getOrganisation', function(err, response, microservice) {
      done(null, {user: {id:3, name:'Paul', organisation: response.organisation}})
    })
  }
}

var seneca = require('seneca')({tag: 'users-service', silent: false})
seneca.use('mesh', {pins: Object.keys(commands)})

for(var cmd in commands) {
  seneca.add(cmd, commands[cmd])
}
