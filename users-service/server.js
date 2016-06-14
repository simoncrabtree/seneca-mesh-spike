var users = []

var commands = {
  'cmd:listUsers': function(msg, done) {
    this.act('role:logging', {message: "listUsers WAS CALLED"}, function(err, response) {})
    done(null, {users: users})
  },
  'cmd:findUser': function(args, done) {
    var user = users.filter(function(u) {
      return u.id === args.id
    })
    this.act('cmd:getOrganisation', function(err, response, microservice) {
      user.organisation = response.organisation
      done(null, user[0])
    })
  },
  'cmd:registerUser': function(msg, done) {
    var newUser = {id: msg.id, name: msg.name}
    users.push(newUser)
    done(null, {newUser: newUser})
  }
}

var seneca = require('seneca')({tag: 'users-service', silent: false})
seneca.use('mesh', {pins: Object.keys(commands)})

for(var cmd in commands) {
  seneca.add(cmd, commands[cmd])
}
